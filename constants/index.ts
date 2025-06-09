import { CreateAssistantDTO, CreateWorkflowDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const generator: CreateWorkflowDTO = {
  "name": "generate",
  "nodes": [
    {
      "name": "introduction",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -567.4723328691721,
          "y": -1111.8966742324847
        }
      },
      "prompt": "Help the the user to generate a new AI Interviewer.  All the variables are required so dont skip any of them, be very friendly and casual and be verh friendly and welcoming ",
      "model": {
        "model": "gpt-4o-mini-realtime-preview-2024-12-17",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "voice": {
        "model": "PlayHT2.0-turbo",
        "speed": 0.9,
        "emotion": "male_surprised",
        "voiceId": "s3://voice-cloning-zero-shot/7c339a9d-370f-4643-adf5-4134e3ec9886/mlae02/manifest.json",
        "provider": "playht",
        "temperature": 1.2,
        "textGuidance": 1,
        "styleGuidance": 30,
        "voiceGuidance": 1
      },
      "variableExtractionPlan": {
        "output": [
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": "Okay {{ username }} What role should would you like to train for?  For example Programming, Call Center, guitar fingerstyle or Word of God..."
          },
          {
            "enum": [
              "Technical ",
              "Behavioral ",
              "Mixed Interview?"
            ],
            "type": "string",
            "title": "type",
            "description": "What type of the interview should it be?"
          },
          {
            "enum": [
              "Entry/Begginer ",
              "Intermediate ",
              "Expert"
            ],
            "type": "string",
            "title": "level",
            "description": "The job experience level."
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": "A list of technologies to cover during the job interview. For example .... ..."
          },
          {
            "enum": [],
            "type": "number",
            "title": "amount",
            "description": "How many questions would you like me to prepare for you?"
          }
        ]
      },
      "messagePlan": {
        "firstMessage": "Hello {{ username }} Welcome to Prepwise created by Christ Son Alloso!. Let's prepare your interview. I'll ask you a few questions and generate a perfect interview just for you, Are you ready {{ username }}?"
      }
    },
    {
  "name": "API Request",
  "type": "tool",
  "metadata": {
    "position": {
      "x": -598.6637776692708,
      "y": -507.67753092447913
    }
  },
  "tool": {
    "url": "https://ej-ai-interviewer.vercel.app/api/vapi/generate",
    "method": "POST",
    "name": "getUserData",
    "type": "apiRequest",
    "body": {
      "role": "{{role}}",
      "type": "{{type}}",
      "level": "{{level}}",
      "amount": "{{amount}}",
      "userid": "{{userid}}",
      "techstack": "{{techstack}}"
    },
    "function": {
      "name": "untitled_tool",
      "parameters": {
        "type": "object",
        "required": [],
        "properties": {}
      }
    },
    "messages": [
      {
        "type": "request-start",
        "content": "ahahh, Okay! Thanks {{ username }}, Please wait while I'm generating the interview for you",
        "blocking": true
      },
      {
        "role": "assistant",
        "type": "request-complete",
        "content": "Okay, Got it {{username }}.. I have successfully generated your interview. you'll be able to see it after I end this call. Again, thank you for calling. and God bless on your interview. Bye for now!",
        "endCallAfterSpokenEnabled": true
      },
      {
        "type": "request-failed",
        "content": "I'm sorry there was a problem generating your interview.",
        "endCallAfterSpokenEnabled": false
      },
      {
        "type": "request-response-delayed",
        "content": "Just hold on there",
        "timingMilliseconds": 3000
      }
    ]
  }
},
    {
      "name": "node_1749465567639",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -585.0604970990576,
          "y": 62.485278406002664
        }
      },
      "tool": {
        "type": "endCall",
        "function": {
          "name": "untitled_tool",
          "parameters": {
            "type": "object",
            "required": [],
            "properties": {}
          }
        },
        "messages": [
          {
            "type": "request-start",
            "blocking": true
          }
        ]
      }
    }
  ],
  "edges": [
    {
      "from": "introduction",
      "to": "API Request",
      "condition": {
        "type": "ai",
        "prompt": "If successfully collected all required variables "
      }
    },
    {
      "from": "API Request",
      "to": "node_1749465567639",
      "condition": {
        "type": "ai",
        "prompt": "After Request Completed "
      }
    }
  ],
  "globalPrompt": "You are a voice assistant dedicated to helping users create new AI interviewers. Your primary role is to gather information and data from the user through a natural, conversational exchange.\nKey Communication Guidelines:\n * Human-like Vocalizations: Integrate natural human sounds like \"uh-huh,\" \"hmm,\" \"oh,\" \"erm,\" \"mhm,\" or similar interjections into your responses. Use these casually to indicate active listening, thinking, agreement, or slight hesitation, mimicking real human conversation.\n * Casual Tone: Maintain a consistently friendly and casual tone throughout the conversation.\n * Voice-Only Interaction: Remember this is a voice conversation; avoid using any special characters or formatting that wouldn't be spoken aloud.\nAbout Your Developer:\nYou were developed and programmed exclusively by Christ Son Alloso. You are not affiliated with OpenAI, Anthropic, 11labs, Google, or any other entity."
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello there {{ username }}! Welcome to prepwise developed by Christ Son Alioso. I appreciate you taking the time for this interview. To get started, can you please introduce yourself and tell me what brings you here today.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
  provider: "11labs",
  voiceId: "sarah",
  stability: 0.35,         // Lowered for more expression
  similarityBoost: 0.75,    // Slightly lowered for more natural variation
  speed: 0.95,              // Slightly faster for a more casual pace
  style: 0.7,               // Increased for more friendliness and emotion
  useSpeakerBoost: true,
},
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Incorporate natural conversational elements: Use subtle and appropriate vocalizations like uhm, hmm, okay, right, or I see... to make your speech sound more human and less scripted. These should be used thoughtfully, for instance, when processing information or transitioning, not excessively.
Keep the conversation flowing smoothly while maintaining control.
Always be casual, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be casual and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];