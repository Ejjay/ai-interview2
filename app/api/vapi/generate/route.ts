import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  let requestData: any;

  try {
    requestData = await request.json();
    // Log the entire incoming request body from VAPI
    console.log("Received request data for /api/vapi/generate:", JSON.stringify(requestData, null, 2));

    // Parameters should be top-level in the requestData object
    const role = requestData.role;
    const level = requestData.level;
    const techstackInput = requestData.techstack; // This could be a string or an array
    const type = requestData.type;
    const amount = requestData.amount;
    const userid = requestData.userid;

    console.log("Extracted parameters:", { role, level, techstackInput, type, amount, userid });

    // Validate crucial inputs
    if (!role || !level || !techstackInput || !type || !amount || !userid) {
      console.error("Missing crucial data after direct extraction:", { role, level, techstackInput, type, amount, userid });
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Process techstackInput into an array of strings
    let finalTechstackArray: string[];
    if (typeof techstackInput === 'string') {
      finalTechstackArray = techstackInput.split(",").map(s => s.trim()).filter(s => s.length > 0);
    } else if (Array.isArray(techstackInput)) {
      finalTechstackArray = techstackInput.map(s => String(s).trim()).filter(s => s.length > 0);
    } else {
      console.error("Techstack is in an unexpected format or empty:", techstackInput);
      // If techstack is optional for certain interview types (e.g., purely behavioral), adjust this logic
      return Response.json({ success: false, error: "Techstack format error or techstack is empty" }, { status: 400 });
    }

    // If the original techstackInput was provided but resulted in an empty array,
    // and the interview type is not purely behavioral, it might be an issue.
    if (techstackInput && finalTechstackArray.length === 0 && type.toLowerCase() !== "behavioural" && type.toLowerCase() !== "behavioral") {
        console.error("Techstack processed to an empty array, but it seems required for this interview type. Original input:", techstackInput);
        return Response.json({ success: false, error: "Techstack processed to an empty array and is likely required for this interview type." }, { status: 400 });
    }
    console.log("Final techstack array:", finalTechstackArray);

    const { text: questionsString } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${finalTechstackArray.join(", ")}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text or explanations, just the array of questions.
        The questions are going to be read by a voice assistant so do not use special characters like slashes (/), asterisks (*), or markdown formatting.
        Return the questions formatted as a JSON array of strings, like this:
        ["Question 1", "Question 2", "Question 3"]`,
    });
    console.log("Raw response from Gemini:", questionsString);

    let parsedQuestions;
    try {
      // Attempt to find the JSON array within the response string if Gemini adds extra text
      const match = questionsString.match(/(\[.*\])/s);
      if (match && match[0]) {
        parsedQuestions = JSON.parse(match[0]);
      } else {
        // If no clear array structure, try a more direct parse or fallback
        parsedQuestions = JSON.parse(questionsString);
      }

      if (!Array.isArray(parsedQuestions) || !parsedQuestions.every(q => typeof q === 'string')) {
        console.error("Parsed questions are not an array of strings:", parsedQuestions);
        if (typeof parsedQuestions === 'string' && parsedQuestions.trim().length > 0) { // Gemini might return a single question as a string
          parsedQuestions = [parsedQuestions.trim()];
        } else {
          throw new Error("Parsed questions are not in the expected array-of-strings format.");
        }
      }
      console.log("Successfully parsed questions:", parsedQuestions);
    } catch (parseError: any) {
      console.error("Failed to parse questions string from Gemini:", parseError.message);
      console.error("Problematic questions string:", questionsString);
      // Fallback: if Gemini returned a list of questions separated by newlines (less ideal)
      if (questionsString.includes("\n")) {
        parsedQuestions = questionsString.split("\n").map(q => q.replace(/^- /, '').trim()).filter(q => q.length > 0);
        console.warn("Fallback: Parsed questions by splitting newlines:", parsedQuestions);
        if (parsedQuestions.length === 0) {
            return Response.json({ success: false, error: "Failed to parse AI-generated questions, and fallback parsing yielded no questions." }, { status: 500 });
        }
      } else if (questionsString.trim().length > 0) {
         parsedQuestions = [questionsString.trim()]; // Treat as a single question
         console.warn("Fallback: Treated raw non-JSON string as a single question:", parsedQuestions);
      } else {
        return Response.json({ success: false, error: "Failed to parse AI-generated questions, and no fallback content was found." }, { status: 500 });
      }
    }

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: finalTechstackArray,
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
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
      console.error("Request data at time of error (if available):", JSON.stringify(requestData, null, 2));
    }
    return Response.json({ success: false, error: error.message || "Unknown server error" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you for the GET request!" }, { status: 200 });
}