import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Brand from "@/app/(models)/Brand";

export async function GET(req: NextRequest) {
    const brandId = req.nextUrl.searchParams.get('id');

    try {
        if (!brandId) {
            return NextResponse.json({
                status: 400,
                message: "Brand ID is missing",
            });
        }

        // Convert brandId to ObjectId
        const objectIdBrandId = new ObjectId(brandId);

        // Fetch the brand data using the provided brandId
        const brand = await Brand.findById(objectIdBrandId);

        if (!brand) {
            return NextResponse.json({
                status: 404,
                message: "Brand not found",
            });
        }

        const result = await Brand.aggregate([
            // Match documents by brand ID 
            { $match: { _id: objectIdBrandId } },
            // Unwind the fcount_audit array to denormalize the documents
            { $unwind: "$fcount_audit" },
            // Convert the date_counted string to a Date object
            {
                $addFields: {
                    "fcount_audit.date_counted": {
                        $toDate: "$fcount_audit.date_counted"
                    }
                }
            },
            // Group documents by week and find the latest fcount for each week
            {
                $group: {
                    _id: {
                        week: { $dateToString: { format: "%Y-%V", date: "$fcount_audit.date_counted" } },
                        brand_id: "$_id"
                    },
                    latest_fcount: { $last: "$fcount_audit.fcount" },
                    maxDate: { $max: "$fcount_audit.date_counted" }
                }
            },
            // Group again by week and get the latest fcount value
            {
                $group: {
                    _id: "$_id.week",
                    brand_id: { $last: "$_id.brand_id" },
                    latest_fcount: { $last: "$latest_fcount" },
                    maxDate: { $max: "$maxDate" }
                }
            },
            // Project the fields to match the desired output format
            {
                $project: {
                    _id: 0,
                    week: "$_id",
                    brand_id: 1,
                    latest_fcount: 1
                }
            }
        ]);

        // Define a custom comparison function to compare weeks
        const compareWeeks = (a : any, b : any) => {
            const weekA = a.week.split('-').map(Number);
            const weekB = b.week.split('-').map(Number);

            // Compare years
            if (weekA[0] !== weekB[0]) {
                return weekA[0] - weekB[0];
            }

            // Compare weeks within the same year
            return weekA[1] - weekB[1];
        };

        // Sort the data array using the custom comparison function
        result.sort(compareWeeks);

        const labels = result.map((item: any) => {return item.week})
        const subs = result.map((item: any) => {return item.latest_fcount})

        return NextResponse.json({labels, subs});
    } catch (error) {
        console.error("Error while fetching rewards:", error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}
