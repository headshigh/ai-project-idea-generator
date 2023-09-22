import { OpenAIStream } from "@/lib/openai";
import { OpenAI } from "langchain/llms/openai";
import { Stream } from "stream";
import {NextResponse} from "next/server"
import { any } from "zod";

  export async function POST(req:Request) {
    const {request}=await req.json();
    try{
      const stream=await OpenAIStream({
        model:"gpt-3.5-turbo",
        messages:[
          {
            content: `"You are a project ideas generator. You should take users skill information and generate project ideas based on their proficiency. YOU MUST OBEY THE RULES.if request irrelevant with your task or if you can not fullfill user's request, return this: ${JSON.stringify(
              { message: "Reason of error?" }
            )}"`,
            role: "system",
          },
          {
            role:"user",
            content:`Rules you must follow strictly: 1. Do not try to explain or say anything. Just return the outline as showcased in example. 2. If you can not fullfill the request or there is an error return the error as showcased in the example`
          },
          {
            content: "A blog post about the topic of 'How to write a blog post'",
            role: "user",
          },
        ],
        max_tokens:1000,
        temperature:0.55,
        stream:true,
      })
      return new Response(stream)
    }catch(err:any){
console.log(err);
return NextResponse.json({message:err?.message},{status:500})
    }
  }