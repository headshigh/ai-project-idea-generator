import { NextResponse } from "next/server";
import { OpenAIStream } from "@/lib/openai";
export const runtime = "edge";
export async function POST(req: Request) {
  const { title } = await req.json();
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!!}`,
      },

      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            content: `"You are a senior software developer , you task is to teach a new software developer. You have clarity about all technologies. Now split the task of building a project mentioned by user into smaller parts and provide chatgpt prompts for each smaller task so that from start to beginning and make the learning curve as less steeper as possible. You should generate the response as shown in the example. Only provide a single prompt for each instruction . Generate new line after each point , Generate th result in json as an array of "{instruction:"",prompt:""}" ,You must follow the provided rules`,
            role: "system",
          },
          {
            content:
              "You must follow these rules 1) the prompt should start with how to. 2) The instruction should be short ",
            role: "user",
          },
          {
            content: "todo application using nodejs and mongodb",
            role: "user",
          },
          {
            content: JSON.stringify({
              msg: [
                {
                  instruction: "initialize a nodejs project",
                  prompt: "how to initialize a nodejs project",
                },
                {
                  instruction: "Set up mongodb",
                  prompt: "How to setup mongodb in nodejs?",
                },
                {
                  instruction: "Create a nodejs server using express",
                  prompt: "how to create a server using express in nodejs?",
                },
                {
                  instruction: "Create controller to todo",
                  prompt:
                    "how to create a controller for todo with mongodb in express application",
                },
                {
                  instruction: "serve routes",
                  prompt: "how to serve routes to the user in express",
                },
              ],
            }),

            role: "assistant",
          },
          { content: title, role: "user" },
        ],
        temperature: 0.88,
        max_tokens: 1000,
        stream: false,
      }),
    });
    const response = await res.json();
    return NextResponse.json({
      msg: response["choices"][0]["message"]["content"],
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: err });
  }
}
