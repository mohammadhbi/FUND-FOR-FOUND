import React from 'react'
import AddTierP from './Public/Tier/AddTierP'
import ProfileImageP from './Public/ProfileImageP'
import SummeryP from './Public/SummeryP'
import TeamP from './Public/Team/TeamP'
import FaqP from './Public/Faq/FaqP'
import Footer from '@/app/auth/components/Footer'
export default function PublicComponent() {
  return (
    <div className='mx-auto'>
     <div className="pb-10">
       <ProfileImageP/>
      </div>
     <div className="mt-10 ml-15">
       <AddTierP/>
     </div>
     <div>
      <SummeryP/>
     </div>
     <div>
      <TeamP/>
     </div>
     <div>
      <FaqP/>
     </div>
     <div>
      <Footer/>
     </div>
    </div>
  )
}
