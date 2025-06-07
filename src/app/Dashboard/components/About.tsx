"use client";
import EditorComponent from '@/app/createbrand/components/EditorComponent'
import React from 'react'

export default function About() {
  return (
    <div >
      <div className='flex gap-2 justify-baseline'>
        <div className='w-3 h-3 bg-[var(--color-primary)] mt-2.5'></div>
        <h1 className='text-2xl '>About</h1>
      </div>
      <p>Tell people why they should be exited for backing your brand. tell about your story,your plan and any thing that may encourage them to contribute.</p>
      <EditorComponent/>
    </div>
  )
}
