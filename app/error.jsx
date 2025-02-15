'use client'
import React, { useEffect, useState } from 'react'

export default function error({error, reset}) {
  const [message, setMessage] = useState('Invest, and see you money grow weekly');
  const text = [
    `Error occured.`,
     `Ensure you installed properly.`,
      `Hope your set us is correct.`, 
    ]
    useEffect(()=>{
        console.log(error)
        const randomIndex = Math.floor(Math.random() * text.length);
        setMessage(text[randomIndex]);
    },[error])
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-10'>
      <h1 className='w-full text-center'>{message}</h1>
      <button className='w-40 h-10 rounded-lg bg-[#5122a2] hover:opacity-75 text-black text-sm font-bold' onClick={()=>reset()}>Go it</button>
    </div>
  )
}
