import { getTokenContent } from "@/app/(services)/frontend/get_token"
import BrandComp from "@/components/pages/brands/brandsComponent"
import MerchantHeader from "@/components/reusable/merchantheader"
import QRScanner from "@/components/pages/cashier/qrScanner"
import React from "react"

export default function Verify() {
    let x = getTokenContent()
    const { _id, user_type } = x
    return (
        <main className="w-full min-h-screen flex flex-col">
            <QRScanner _id={_id} user_type={user_type} />
        </main>
    )
}
