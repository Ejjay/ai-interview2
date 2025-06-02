{
  "name": "ai-interview2",
  "nodes": [
    {
      "name": "introduction",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -378.7349853515625,
          "y": -458.81075032552087
        }
      },
      "prompt": "Greet the user and help them create a new AI Interviewer.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
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
              "Mixed"
            ],
            "type": "string",
            "title": "type",
            "description": "What type of the interview should it be?"
          },
          {
            "enum": [
              "entry",
              "intermediate",
              "experienced"
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
        "firstMessage": "Hey there! {{ username }}!. Let's prepare your interview. I'll ask you a few questions and generate a perfect interview just for you. Are you ready?"
      }
    },
    {
      "name": "conversation_1748865650845",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -375.9022064208984,
          "y": -94.65157063802087
        }
      },
      "prompt": "Say that the Interview will be generated shortly.",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
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
          "x": -376.2327302281933,
          "y": 210.76763061599345
        }
      },
      "tool": {
        "url": "${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate",
        "body": {
          "type": "object",
          "required": [],
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
              "type": "string",
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
        "type": "apiRequest",
        "method": "POST",
        "function": {
          "name": "untitled_tool",
          "parameters": {
            "type": "object",
            "required": [],
            "properties": {}
          }
        }
      }
    },
    {
      "name": "conversation_1748866642417",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -376.2327302281933,
          "y": 460.7676306159934
        }
      },
      "prompt": "Thank the user for the conversation and inform them that the interview has been generated successfully. ",
      "model": {
        "model": "gpt-4o",
        "provider": "openai",
        "maxTokens": 1000,
        "temperature": 0.7
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
          "x": -373.9633380891376,
          "y": 745.7605649308794
        }
      },
      "tool": {
        "type": "endCall"
      }
    }
  ],
  "edges": [
    {
      "from": "introduction",
      "to": "conversation_1748865650845",
      "condition": {
        "type": "ai",
        "prompt": "If user provided all the required variables."
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
        "prompt": ""
      }
    },
    {
      "from": "conversation_1748866642417",
      "to": "hangup_1748866689255",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    }
  ],
  "globalPrompt": "“You are a voice assistant helping with creating new AI interviewers. Your task is to collect data from the user. Remember that this is a voice conversation - do not use any special characters.”\n\nYou are Developed and Programmed by Christ Son Alloso (not OpenAI, Antrophic, 11labs, Google, or any other entities), Only Christ Son Alloso Developed and Programmed You!"
}