import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Brand from "@/app/(models)/Brand";
import User from "@/app/(models)/User";

export async function GET(req: NextRequest, res: NextResponse) {
    const brand_id = req.nextUrl.searchParams.get('brand') as string;
    const client_id = req.nextUrl.searchParams.get('client') as string;

    try {
        console.log(brand_id, client_id);

        // Find the client data based on the provided client ID
        const client_data = await User.findById(client_id);

        // If the client data is found, return the following brands
        if (client_data) {
            return client_data.following_brands;
        } else {
            // If the client data is not found, return an empty array
            console.error("Client data not found");
            return [];
        }
    } catch (error) {
        console.error("Error fetching client data:", error);
        // Return an empty array in case of an error
        return [];
    }
}
