"use client"
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card';
  function Page() {
    
    const [Loading,setLoading]=useState(false);
    const [response,setResponse]=useState<string>();
    const [prompts,setPrompts]=useState<string>();
    const search=useSearchParams();
    useEffect(()=>{
      generateResponse();
    },[])
    console.log()
    console.log(response);
    const generateResponse = async () => {
      // e.preventDefault();
      setResponse("");
      setLoading(true);
      const response=await fetch('/api/projects',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
            technology1:search.get("technology1"),
            technology2:search.get("technology2"),
            technology3:search.get("technology3"),
            proficiency2:search.get("proficiency2"),
            proficiency1:search.get("proficiency1"),
            proficiency3:search.get("proficiency3")
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
      setResponse(answer => answer + decodedChunk); // update state with new chunk
    }
      setLoading(false);
    };
    console.log(response);
    // const ideas=response?JSON.parse(response.toString()):{msg:[]};
    // console.log(ideas);
  return (
    <div className='bg-background flex items-center justify-center dark  h-screen'>
    {response && <Card className='w-2/3 h-[50vh] px-2 py-5' >{response}</Card>}
    </div>
  )
}

export default Page