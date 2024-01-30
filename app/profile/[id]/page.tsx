"use client"

import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import IconComp from '@/components/pages/profile/iconComponent'
import ProfileDetails from '@/components/pages/profile/profileDetailsComponent'

export default function Profile({params}:  {params: {slug: string}}) {

  return (
    <main className="w-full min-h-screen">
      <section className="profile-header"></section>
      <IconComp/>
      <ProfileDetails/>
    </main>
  )
}
