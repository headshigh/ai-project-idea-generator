import React from 'react'
import { Card } from './ui/card'
function Navbar() {
  return (
    <Card className='flex  border-b-1 px-3 rounded-none dark   bg-background justify-between py-3'>
        <h1 className='text-3xl  text-white'>Ideax</h1>
    </Card>
  )
}

export default Navbar