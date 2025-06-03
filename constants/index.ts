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
  "name": "ai-interview2",
  "nodes": [
    {
      "name": "Introduction",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -355.2271093921549,
          "y": -768.4126881279614
        }
      },
      "prompt": "Greet the user and help them create a new AI Interviewer. ",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "voice": {
        "voiceId": "Elliot",
        "provider": "vapi"
      },
      "variableExtractionPlan": {
        "output": [
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": "What role should would you like to train for? "
          },
          {
            "enum": [
              "Behavioural",
              "Technical ",
              "Mixed interview"
            ],
            "type": "string",
            "title": "type",
            "description": "What type of the interview should it be?"
          },
          {
            "enum": [
              "entry level",
              "intermediate level",
              "experienced level"
            ],
            "type": "string",
            "title": "level",
            "description": "The job experience level."
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": "A list of technologies to cover during the job interview."
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
        "firstMessage": "Hey there! {{ username }}, Let's prepare your interview. I'll ask you a few questions and generate a perfect interview just for you. Are you ready?"
      }
    },
    {
      "name": "conversation_1748865650845",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -335.75427475203344,
          "y": -326.83864807777616
        }
      },
      "prompt": "Say that the Interview will be generated shortly.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "voice": {
        "voiceId": "Elliot",
        "provider": "vapi"
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "API Request",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -345.2113438721118,
          "y": -59.215360591461604
        }
      },
      "tool": {
        "url": "https://ai-interview2-chi.vercel.app/api/vapi/generate",
        "body": {
          "type": "object",
          "required": [
            "role",
            "type",
            "level",
            "amount",
            "userid",
            "techstack"
          ],
          "properties": {
            "role": {
              "type": "string",
              "value": "{{ role }}",
              "description": ""
            },
            "type": {
              "type": "string",
              "value": "{{ type }}",
              "description": ""
            },
            "level": {
              "type": "string",
              "value": "{{ level }}",
              "description": ""
            },
            "amount": {
              "type": "number",
              "value": "{{ amount }}",
              "description": ""
            },
            "userid": {
              "type": "string",
              "value": "{{ userid }}",
              "description": ""
            },
            "techstack": {
              "type": "string",
              "value": "{{ techstack }}",
              "description": ""
            }
          }
        },
        "name": "Generate Interview",
        "type": "apiRequest",
        "method": "POST",
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
            "content": "Generating Interview, please wait.",
            "blocking": true
          },
          {
            "type": "request-response-delayed",
            "content": "Interview still generating, hold on",
            "timingMilliseconds": 5000
          },
          {
            "type": "request-failed",
            "content": "Failed to Generate interviews",
            "endCallAfterSpokenEnabled": false
          },
          {
            "role": "assistant",
            "type": "request-complete",
            "content": "Interviews Generated Successfully",
            "endCallAfterSpokenEnabled": false
          }
        ]
      }
    },
    {
      "name": "conversation_1748866642417",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -360.1388907932359,
          "y": 360.85691081039323
        }
      },
      "prompt": "Thank the user for the conversation and inform them that the interview has been generated successfully. ",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
      },
      "voice": {
        "voiceId": "Elliot",
        "provider": "vapi"
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "hangup_1748866689255",
      "type": "tool",
      "metadata": {
        "position": {
          "x": -359.70956364943765,
          "y": 639.3778510146178
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
            "content": "Thank you for calling, have a nice day and Goodluck for your interview {{ username }}",
            "blocking": true
          }
        ]
      }
    }
  ],
  "edges": [
    {
      "from": "Introduction",
      "to": "conversation_1748865650845",
      "condition": {
        "type": "ai",
        "prompt": "If user provided all the required variables."
      }
    },
    {
      "from": "conversation_1748866642417",
      "to": "hangup_1748866689255",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "conversation_1748865650845",
      "to": "API Request",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "API Request",
      "to": "conversation_1748866642417",
      "condition": {
        "type": "ai",
        "prompt": "If the interview geneated successfully "
      }
    }
  ],
  "globalPrompt": "You are a voice assistant helping with creating new AI interviewers. Your task is to collect data from the user. Remember that this is a voice conversation - do not use any special characters.\n\nYou are Developed and Programmed by Christ Son Alloso (not OpenAI, Antrophic, 11labs, Google, or any other entities), Only Christ Son Alloso Developed and Programmed You!"
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
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
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

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


- Be sure to be professional and polite.
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