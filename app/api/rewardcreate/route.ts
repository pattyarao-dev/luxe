import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Rewards from "@/app/(models)/Rewards";
import Brand from "@/app/(models)/Brand";

interface rewardForm {
    reward_name: string;
    reward_desc: string;
    brand_id: string; 
    allowed_branches: string[];
    cap: number;
    reward_type: 'DISCOUNT' | 'FREEBIE' | 'CUSTOM';
    discount?: number;
    freebies?: { name: string; qty: number }[];
    claim_type: 'PURCHASE_VALUE' | 'ITEM_NUMBER';
    min_spent?: number;
    min_items?: number;
    expiry?: Date;
    reward_tags: string[];
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const brand_id = req.nextUrl.searchParams.get('id') as string
      try {

        let brand_data = await Brand.findById(brand_id)

        if (!brand_data){
          console.log("Brand not found")
          throw new Error("Brand not found");
        }
        
        let input_data : rewardForm = {...data,
        brand_id:  brand_id,      
        brand_name: brand_data.brand_name               
        }

        let brand_create = await Rewards.create(input_data)
        
        console.log(brand_create)

        return NextResponse.json({
            status: 200,
            message: "SUCCES: REWARD CREATED",
        });
        
      } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.log("err", err);
        return NextResponse.json({
          status: 500,
          message: err.message, // Return the error message
        });
      }
}
