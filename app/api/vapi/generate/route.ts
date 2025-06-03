import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  let requestData;
  try {
    requestData = await request.json();
    console.log("Received request data:", JSON.stringify(requestData, null, 2)); // Log incoming data

    const { type, role, level, techstack, amount, userid } = requestData;

    // Validate crucial inputs
    if (!role || !level || !techstack || !amount || !userid) {
      console.error("Missing crucial data in request:", requestData);
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    console.log("Attempting to generate text with Gemini...");
    const { text: questionsString } = await generateText({
      model: google("gemini-2.0-flash-001"), // Ensure this model is correct and active
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
      `,
    });
    console.log("Raw response from Gemini:", questionsString); // CRITICAL LOG

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questionsString);
      console.log("Successfully parsed questions:", parsedQuestions);
    } catch (parseError) {
      console.error("Failed to parse questions string from Gemini:", parseError);
      console.error("Problematic questions string:", questionsString); // Log the string that failed
      return Response.json({ success: false, error: "Failed to parse AI generated questions" }, { status: 500 });
    }

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: typeof techstack === 'string' ? techstack.split(",").map(s => s.trim()) : [], // Handle if techstack is not a string
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };
    console.log("Interview object to be saved:", JSON.stringify(interview, null, 2));

    await db.collection("interviews").add(interview);
    console.log("Interview successfully saved to Firestore for userid:", userid);

    return Response.json({ success: true, interviewId: "SOME_ID_IF_YOU_HAVE_IT" }, { status: 200 }); // Consider returning the new ID
  } catch (error) {
    console.error("Unhandled error in /api/vapi/generate:", error);
    // Log the requestData if available and it's not a JSON parsing error of the request itself
    if (requestData) {
        console.error("Request data at time of error:", JSON.stringify(requestData, null, 2));
    }
    return Response.json({ success: false, error: (error as Error).message || "Unknown server error" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}