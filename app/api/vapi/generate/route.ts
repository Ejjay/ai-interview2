import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  let requestData;
  let paramsFromToolCall = false;
  let toolCallArgs: any;

  try {
    requestData = await request.json();
    console.log("Received request data:", JSON.stringify(requestData, null, 2));

    // Check if the payload is from an assistant's tool call via Vapi's wrapped message
    // This structure is based on the comment you provided.
    if (
      requestData.message &&
      requestData.message.toolCallList &&
      Array.isArray(requestData.message.toolCallList) &&
      requestData.message.toolCallList.length > 0 &&
      requestData.message.toolCallList[0].function &&
      requestData.message.toolCallList[0].function.arguments
    ) {
      const funcArgs = requestData.message.toolCallList[0].function.arguments;
      if (typeof funcArgs === 'string') {
        try {
          toolCallArgs = JSON.parse(funcArgs);
          paramsFromToolCall = true;
          console.log("Parsed arguments from assistant tool call (string):", toolCallArgs);
        } catch (e) {
          console.error("Failed to parse tool call arguments string:", funcArgs, e);
          // If parsing fails, we'll fall back to the direct requestData access.
        }
      } else if (typeof funcArgs === 'object') {
        toolCallArgs = funcArgs;
        paramsFromToolCall = true;
        console.log("Received object arguments from assistant tool call:", toolCallArgs);
      }
    }

    let role, level, techstackInput, type, amount, userid;

    if (paramsFromToolCall && toolCallArgs) {
      role = toolCallArgs.role;
      level = toolCallArgs.level;
      techstackInput = toolCallArgs.techstack; // Could be a string or an array
      type = toolCallArgs.type;
      amount = toolCallArgs.amount;
      userid = toolCallArgs.userid; // Make sure the assistant tool provides this
    } else {
      // Fallback to the direct payload structure (e.g., from workflow's apiRequest tool)
      console.log("Falling back to direct request data access.");
      role = requestData.role;
      level = requestData.level;
      techstackInput = requestData.techstack;
      type = requestData.type;
      amount = requestData.amount;
      userid = requestData.userid;
    }

    // Validate crucial inputs
    if (!role || !level || !techstackInput || !amount || !userid) {
      console.error("Missing crucial data after attempting to extract:", { role, level, techstackInput, amount, userid });
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Process techstackInput into an array of strings
    let finalTechstackArray: string[];
    if (typeof techstackInput === 'string') {
      finalTechstackArray = techstackInput.split(",").map(s => s.trim());
    } else if (Array.isArray(techstackInput)) {
      finalTechstackArray = techstackInput.map(s => String(s).trim());
    } else {
      console.error("Techstack is in an unexpected format:", techstackInput);
      return Response.json({ success: false, error: "Techstack format error" }, { status: 400 });
    }
    console.log("Final techstack array:", finalTechstackArray);

    console.log("Attempting to generate text with Gemini with params:", { role, level, finalTechstackArray, type, amount });
    const { text: questionsString } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${finalTechstackArray.join(", ")}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
      `,
    });
    console.log("Raw response from Gemini:", questionsString);

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questionsString);
      console.log("Successfully parsed questions:", parsedQuestions);
    } catch (parseError) {
      console.error("Failed to parse questions string from Gemini:", parseError);
      console.error("Problematic questions string:", questionsString);
      return Response.json({ success: false, error: "Failed to parse AI generated questions" }, { status: 500 });
    }

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: finalTechstackArray,
      questions: parsedQuestions,
      userId: userid,
      finalized: true, // Assuming interview should be finalized after question generation
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };
    console.log("Interview object to be saved:", JSON.stringify(interview, null, 2));

    const interviewRef = await db.collection("interviews").add(interview);
    console.log("Interview successfully saved to Firestore with ID:", interviewRef.id, "for userid:", userid);

    return Response.json({ success: true, interviewId: interviewRef.id }, { status: 200 });
  } catch (error: any) {
    console.error("Unhandled error in /api/vapi/generate:", error);
    if (requestData) {
      console.error("Request data at time of error:", JSON.stringify(requestData, null, 2));
    }
    return Response.json({ success: false, error: error.message || "Unknown server error" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}