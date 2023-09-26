"use client"
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
  function Page() {
    const router=useRouter();
    const [Loading,setLoading]=useState(true);
    const [response,setResponse]=useState<string>();
    const [prompts,setPrompts]=useState<string>();
    const search=useSearchParams();
    useEffect(()=>{
      // generateResponse();
    },[])
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
    const result=await response.json();
    console.log(result,"result");
    console.log(result.msg,"msg");
    setResponse(result.msg);
    console.log(response)
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
    //   setResponse(answer => answer + decodedChunk); // update state with new chunk
    setLoading(false);
    }
    console.log(response);
    // const ideas=response?JSON.parse(response.toString()):{msg:[]};
    // console.log(ideas);
  return (
    <div className='bg-background flex flex-col items-center justify-center dark  h-screen'>
      <h1 className='text-white text-3xl font-medium text-left pb-8'>Project Ideas: </h1>
    { <Card className='w-2/3 min-h-[50vh] px-4 py-5' >
      {Loading?<Spinner/>:
     response  && Object.entries(JSON.parse(response)).map(([key, value]) => (
        <h2 onClick={()=>router.push(`/prompt?title=${value}`)} className='text-xl py-2  cursor-pointer font-medium' key={key}>{key}: {value}</h2>
      ))}</Card>}
    </div>
  )
}
 export function  Spinner() {
  return (
    <div role="status" className='flex items-center justify-center h-full'>
    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
  )
}
export default Page