"use client";
import React from 'react'
import EditorComponent from '../Editor Summery/EditorComponent'
import Link from 'next/link'
export default function IntroBrand() {
  return (
    <div>
<p className='text-[var(--color-primary)] text-4xl font-bold  pb-2'>Detailed info</p>
<p className='text-lg font-medium text-[var(--color-gray-3)]'>What is the primary mission or objective of your brand/organization?</p>
<p className='text-sm text-[var(--color-gray-3)]'>Be more specific about it, as it will be published as your deck on the 3F(150-300 characters).<Link href="/readmore"><span className='text-blue-600'>read more</span></Link></p>
      <EditorComponent/> 
    </div>
  )
}