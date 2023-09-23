import { OpenAIStream } from "@/lib/openai";
import {NextResponse} from "next/server"
export const runtime="edge"
  export async function POST(req:Request):Promise<Response> {
    const {technology1,proficiency1,technology2,proficiency2,technology3,proficiency3}=(await req.json()) as {
      technology1:string,
      proficiency1:number,
      technology2?:string,
      proficiency2?:number,
      technology3?:string,
      proficiency3?:number,
    };
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
            content:`I have knowledge in ${technology1} and my proficiency in it is ${proficiency1} out of 10. ${technology2 && ` I also have knowledge about ${technology2} and my proficiency in it is ${proficiency2} out of 10 ${technology3 && ` I also have knowledge about ${technology3} and my proficiency in it is ${proficiency3} out of 10`}`} `,
            role:"system",
          },
          {
            role:"user",
            content:`Rules you must follow strictly: 1. Do not try to explain or say anything. Just return the project ideas in points. 2. If you can not fullfill the request or there is an error return the error as showcased in the example`
          },
        ],
        max_tokens:1000,
        temperature:0.55,
        stream:true,
      })
      return new Response(stream)
    }catch(err:any) {
console.log(err);
return NextResponse.json({message:err?.message},{status:500})
    }
  }