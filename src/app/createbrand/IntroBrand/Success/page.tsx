"use client";
import React from 'react'
import Image from 'next/image'
import Congratulation from '../../../../../public/Congratulation.png'
import Link from 'next/link'
export default function page() {
  return (
    <div className='flex flex-col justify-center items-center gap-y-4 mt-15'>
     <p className='text-[var(--color-primary)] text-4xl font-bold'>Congratulation !</p>
      <Image src={Congratulation} alt="image" width={507} height={324}/>
      <p className='text-[var(--color-gray-1)] text-2xl font-bold'>Your Creative Starter has been approved by our experts!</p>
      <p className='text-[var(--color-gray-2)] text-lg'>Welcome aboard! Lets dive in and get started</p>
      <Link className='mt-20' href="/Profile">
      <span className='px-4 py-2.5 bg-[var(--color-primary)] text-white rounded mt-5'>Go to my profile</span>
      </Link>
    </div>
  )
}
