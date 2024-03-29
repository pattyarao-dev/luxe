import { BrandTypes } from "@/app/types/brandTypes"
import { ObjectId } from "mongoose"
import React from "react"
import Brand from "@/app/(models)/Brand"
import { ClientBrandProfile } from "@/components/pages/clientbrandprofile/clientBrandProfile"
import { getTokenContent } from "@/app/(services)/frontend/get_token"

async function getFollowingBrands(id: ObjectId) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/follow/brands?id=${id}`
        )
        const data = await response.json()
        const followingBrands = data.following_brands
        return followingBrands
    } catch (error) {
        console.error("Error fetching brands", error)
    }
}

export default async function BrandProfile({
    params
}: {
    params: { id: string }
}) {
    const user = getTokenContent()
    const { _id, user_type } = user
    const followingBrands = await getFollowingBrands(user._id)

    const checkBrandInFollowing = (
        brandId: string,
        followingBrands: BrandTypes[]
    ) => {
        console.log(followingBrands)
        const filteredBrands = followingBrands.filter((brand) =>
            brand._id.toString().toLowerCase().includes(brandId.toLowerCase())
        )
        return filteredBrands.length > 0 // Return true if filtered array has elements, otherwise false
    }

    const isFollowing: boolean = checkBrandInFollowing(
        params.id,
        followingBrands
    )
    return (
        <main>
            {/* {brand && (
        <p>{brand.brand_name}</p>
      )} */}
            <ClientBrandProfile
                brandId={params.id}
                userId={user._id}
                isFollowing={isFollowing}
            />
        </main>
    )
}
