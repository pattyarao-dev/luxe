import UserManagementComp from '@/components/pages/usermanagement/usermanagementComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React from 'react'

export default function UserManagement() {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <MerchantHeader/>
            <UserManagementComp/>
        </main>
        
    )
}