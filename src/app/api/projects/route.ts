import { OpenAIStream } from "@/lib/openai";
import {NextResponse} from "next/server"
export const runtime="edge"
  export async function POST(req:Request):Promise<Response> {
    // const {technology1,proficiency1,technology2,proficiency2,technology3,proficiency3}=(await req.json()) as {
    //   technology1:string,
    //   proficiency1:number,
    //   technology2?:string,
    //   proficiency2?:number,
    //   technology3?:string,
    //   proficiency3?:number,
    // };
    const technology1="django";
    const proficiency1="2";
    const technology2="python";
    const proficiency2="2";
    const technology3="socketio";
    const proficiency3="10";
    console.log(technology1);
    try{
      const nonstream=await fetch("https://api.openai.com/v1/chat/completions",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY!!}`,
        },
        body:JSON.stringify({
          model:"gpt-3.5-turbo",
          messages:[
            {
              content: `"You are a project ideas generator. You should take users skill information and generate project ideas based on their proficiency. if the proficiency is low produce relatively simpler application ideas. YOU MUST OBEY THE RULES.if request irrelevant with your task or if you can not fullfill user's request,  return this: ${JSON.stringify(
                { message: "{Reason of error?}" }
              )}"`,
              role: "system",
            },
            {
              content:`I have knowledge in ${technology1} and my proficiency in it is ${proficiency1} out of 10. ${technology2 && ` I also have knowledge about ${technology2} and my proficiency in it is ${proficiency2} out of 10 ${technology3 && ` I also have knowledge about ${technology3} and my proficiency in it is ${proficiency3} out of 10`}`} `,
              role:"user",
            },
            {
              role:"user",
              content:`Rules you must follow strictly: 1. Do not try to explain or say anything. Just return the project ideas in points without any other description as shown in the example. 2. If you can not fullfill the request or there is an error return the error as showcased in the example 3.Make sure the response  is strictly as formatted in the example 4)Provide your answer in JSON form. Reply with only the answer in JSON form and include no other commentary 4) make sure to add numbering infront of each project idea
              )`
            },
            {
              content:"Project ideas for React, node and Mongodb",
              role:"user",
            },
            {
              content:JSON.stringify("Social Media Dashboard, Online Learning Management System, Task Scheduler and Reminder App, Blogging Platform, Real-time Chat Application, Weather Forecasting App, Personal Finance Tracker"),
                role:"assistant",
            }
          ],
          max_tokens:100,
          temperature:0.55,
          stream:false,
        })
      })
      const response=await nonstream.json();
      return  NextResponse.json({msg:response['choices'][0]['message']['content']
    })
    }catch(err:any) {
     console.log(err);
return NextResponse.json({message:err?.message},{status:500})
    }
  }
  