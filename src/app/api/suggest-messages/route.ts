import { streamText } from "ai";   //High-level helper from Vercel AI SDK
import { openai } from "@ai-sdk/openai";   //OpenAI provider factory

export const runtime = "edge";  //Run this route on Vercel Edge Functions

export async function POST() {
    try {
  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a deserve audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What is a hobby you are recently started?|| If you could have dinner with any historical figure, who would it be?||What is a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming coversational enviroment.";
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  return result.toTextStreamResponse();       //Converts the AI token stream → ReadableStream
}
catch(err){
    console.log("An error occured",err);
}
}  
//The key is read automatically from the environment variable
//You → Vercel AI SDK → Provider → Stream → Response
/*
What happens internally:
openai("gpt-4o-mini")
Selects the OpenAI provider
Configures auth
Knows how to talk to OpenAI APIs

streamText(...)
Sends prompt to OpenAI
Starts receiving tokens incrementally
Wraps output in a unified stream
No manual streaming logic needed.
 */