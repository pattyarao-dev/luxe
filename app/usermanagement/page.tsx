import UserManagementComp from '@/components/pages/usermanagement/usermanagementComponent'
import MerchantHeader from '@/components/reusable/merchantheader'
import React, {Suspense} from 'react'

export default function UserManagement() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="w-full min-h-screen flex flex-col">
                <MerchantHeader/>
                <UserManagementComp/>
            </main>
        </Suspense>
    )
}