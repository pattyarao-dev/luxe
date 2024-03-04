import { getTokenContent } from '../(services)/frontend/get_token'
import BrandComp from '@/components/pages/brands/brandsComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React from 'react'

export default function Brands() {
    let x = getTokenContent()
    const {_id, user_type} = x;
    return (
        <main className="w-full min-h-screen flex flex-col">
            <MerchantHeader/>
            <BrandComp id={_id} userType={user_type}/>
        </main>
    )
}