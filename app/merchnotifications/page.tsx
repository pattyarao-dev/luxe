import MerchantHeader from '@/components/reusable/merchantheader'
import MerchNotificationsComp from '@/components/pages/merchnotifications/merchnotificationsComponent'
import React from 'react'
import { getTokenContent } from '../(services)/frontend/get_token'

export default function MerchNotifications() {
    let x = getTokenContent();
    const {_id, user_type} = x;
    return (
        <main className="w-full min-h-screen flex flex-col">
            <MerchantHeader/>
            <MerchNotificationsComp id={_id} userType={user_type}/>
        </main>
    )
  }