import { OpenAIStream } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST (req:Request){
    try{
    const {prompt}=await req.json();
    const stream=await OpenAIStream({
    model:"gpt-3.5-turbo",
    messages:[
        {
            content:`"You are expert in software development, You are provided prompts. You should generate correct code to implement the feature provided in prompts. You donot need to provide explanation "`,
            role:"system"
        },
        {
            content:`${prompt}`,
            role:"user"
        }
    ],
    stream:true,
    max_tokens:10,
    temperature:0.8
})
return new Response(stream);
}catch(err){
    console.log(err);
}
}