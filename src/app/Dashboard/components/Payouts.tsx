"use client";
import React from 'react'
import Link from 'next/link';
export default function Payouts() {
  return (
    <div>
      <div className='flex gap-3'>
        <div className='w-3 h-3 mt-2 bg-[var(--color-primary)]'></div>
        <p>Pay out</p>
      </div>
      <p>Your wallet      Blance :</p>
      <div className='flex gap-4'>
        <Link href="/...."><p className='text-white bg-[var(--color-primary)] p-2.5 rounded'>Connect to your wallet</p></Link>
        <Link href=".////"><p className='text-white bg-[var(--color-primary)] p-2.5 rounded'>Connect to your bank</p></Link>
      </div>
    </div>
  )
}
