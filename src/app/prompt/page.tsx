"use client"
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
function Page() {
  const router=useRouter();
    const search=useSearchParams();
    const title=search.get("title");
    const [prompt,setPrompt]=useState("");
    const [loading,setLoading]=useState(false);
     useEffect(()=> {
        generatePrompts();
    },[])
    const generatePrompts = async () => {
        // e.preventDefault();
        setPrompt("");
        setLoading(true);
        const response=await fetch('/api/prompt',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
              title:title,
          })
      });
      if (!response.ok || !response.body) {
        throw response.statusText;
      }
    
      // Here we start prepping for the streaming response
      // const reader = response.body.getReader();
      // const decoder = new TextDecoder();
      // const loopRunner = true;
      // while (loopRunner) {
      //   // Here we start reading the stream, until its done.
      //   const { value, done } = await reader.read();
      //   if (done) {
      //     break;
      //   }
      //   const decodedChunk = decoder.decode(value, { stream: true });
      const result=await response.json();
      console.log("result",result);
        setPrompt(JSON.parse(result.msg).msg);
        console.log("prompt",prompt)
        setLoading(false);
      console.log(prompt);  
  return (
    <div className='dark bg-background min-h-screen'>
      <h1>Prompts</h1>
        {prompt && <div className='flex items-center justify-center dark  h-screen'>
            <Card className='w-2/3 h-[50vh] px-2 py-5' >{Object.entries(JSON.parse(prompt)).map(([key,value])=>(
              <h2 onClick={()=>router.push(`/prompt?title=${value}`)} className='text-xl py-2  cursor-pointer font-medium' key={key}>{key}: {value}</h2>
            ))}</Card>
            </div>}
    </div>
  )
}
}
export default Page;