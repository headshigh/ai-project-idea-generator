"use client"
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';
function Page() {
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
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;
      while (loopRunner) {
        // Here we start reading the stream, until its done.
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        setPrompt(answer => answer + decodedChunk);
      }
        setLoading(false);
      };
  return (
    <div className='dark bg-background'>
        {prompt && <div className='flex items-center justify-center dark  h-screen'>
            <Card className='w-2/3 h-[50vh] px-2 py-5' >{prompt}</Card>
            </div>}
    </div>
  )
}

export default Page