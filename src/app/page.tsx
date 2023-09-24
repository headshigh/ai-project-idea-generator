"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@radix-ui/react-slider'
import React, { useState } from 'react'
import Link from 'next/link'
function Page() {
  // const {technology1,proficiency1,technology2,proficiency2}=
  const [technologies,setTechnologies]=useState({
    technology1:"React",
    technology2:"Node",
    technology3:"Javascript",
  })
  const [proficiency,setproficiency]=useState({
    proficiency1:"5",
    proficiency2:"8",
    proficiency3:"7",
  })
  return (
    <div className=' dark flex bg-black text-white items-center h-screen justify-center'>
      <div className=''>
        <h1 className='text-5xl  font-medium tracking-wider font-sans'>Select Technology and Proficiency</h1>
        <div className='flex  gap-10  pt-4 items-center '>
          <h1 className='text-lg'> Technology-1</h1>
          <Input  className='w-17' placeholder='React'/>
          <Slider defaultValue={[5]} max={10} step={1} onChange={(value)=>console.log(value)}/>
        </div>
        <div className='flex pt-4 items-center gap-10'>
          <h1>Technology-2</h1>
          <Input placeholder='Javascript' className='w-17'/>
          <Slider defaultValue={[5]} max={10} step={1} onChange={(value)=>console.log(value)}/>
        </div>
        <div className='flex pt-4 items-center gap-10 mb-4'>
          <h1>Technology-3</h1>
          <Input className='w-17' placeholder='CSS'/>
          <Slider defaultValue={[5]} max={10} step={1} onChange={(value)=>console.log(value)}/>
        </div>
        <Link className='' href={`/ideas?technology1=${technologies.technology1}&&$technology2=${technologies.technology2}&&technology3=${technologies.technology3}&&proficiency1=${proficiency.proficiency1}&& proficiency2=${proficiency.proficiency2} && proficiency3=${proficiency.proficiency3}`}>
        <Button className=''>Generate Project ideas</Button>
        </Link>
      </div>
    </div>
  )
}
export default Page;