import React from 'react'
import Image from 'next/image'
import success from "../../../../../public/success.png"
import Link from 'next/link'

function WelcomePage() {
  return (
    <div className='flex flex-col justify-center items-center mt-29'>
     <Image src={success} width={405} height={345} alt="" /> 
     <p className='text-[var(--color-gray-2)] text-3xl'>Your journey begins here.</p>
     <p className='text-[var(--color-gray-2)] text-3xl'>Redy to start?</p>
    <div className='flex gap-15 mt-18'>
      <Link href="/">
     <span className='text-white bg-[var(--color-primary)] py-2.5 px-5 rounded'>
     Go homepage
     </span>
      </Link>
      <Link href="/createbrand">
     <span className='text-white bg-[var(--color-primary)] rounded px-6 py-2.5'>
     Start project   
     </span>
      </Link>
    </div>
    </div>
  )
}

export default WelcomePage
