import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Rewards from "@/app/(models)/Rewards";
import User from "@/app/(models)/User";
import Claim_Bucket from "@/app/(models)/Claim_Bucket";
import { salesCounter } from "@/app/(services)/sales_counter";
import { transactionEngine } from "@/app/(services)/transaction_engine";
import { checkIfClaimedRewardByID } from "@/app/(services)/claimed_reward_checker";
import Claim_Transaction from "@/app/(models)/Claim_Transaction";

interface SalesInfo {
    sales_total: number, 
    sales_count: number,
}

interface Claim_Transaction{
    claimed_by: string, 
    reward: string, 
}

interface ClaimTransactions{
    claimed_by: string, 
    processed_by: string, 
    sales_count: number, 
    sales_value: number
}

interface ClaimBucket {
    claims_transactions: ClaimTransactions[]
    bucket_claim_count: number, 
    bucket_sales_total: number, 
    bucket_sales_count: number
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const reward_id = req.nextUrl.searchParams.get('id') as string
      try {

        let reward_data = await Rewards.findById(reward_id)
        
        if (!reward_data) {
            console.log("Reward not found")
            throw new Error("Reward not found");
        }

        if(await checkIfClaimedRewardByID(data.client_id,reward_id)){
            console.log("Client has claimed this reward")
            throw new Error("Client has claimed this reward");
        }


        // CHECK IF CASHIER TYPE IS VALID 
        let cashier_data = await User.findById(data.cashier_id)
        if(cashier_data.user_type !== 'CASHIER'){
            console.log("Not a valid User Type. Must be a CASHIER")
            throw new Error("Not a valid User Type. Must be a CASHIER");
        }

        // CHECK IF CASHIER IS UNDER THE SAME BRAND 
        if(cashier_data.assigned_brand.toString() !== reward_data.brand_id.toString()){
            console.log("Not a valid User. Mismatch of Brans Assignment")
            throw new Error("Not a valid User. Mismatch of Brans Assignment");
        }

        // CHECK IF THE REWARD IS ACCEPTED BY THE CASHIER'S BRANCH
        if(!reward_data.allowed_branches.includes(cashier_data.assigned_branch)){
            console.log("Reward not Offered in this Branch")
            throw new Error("Reward not Offered in this Branch");
        }

        // CHECK IF REWARD IS ALREADY EXPIRED 
        if(reward_data.is_expired){
            console.log("Reward has expired");
            throw new Error("Reward has expired");
        }
        else {

            const rewardExpiryDate = new Date(reward_data.expiry);
            const currentDate = new Date();

            if (currentDate > rewardExpiryDate) {
                await Rewards.updateOne(
                    {_id: reward_id}, 
                    {is_expired: true})

                console.log("Reward has expired");
                throw new Error("Reward has expired");
            }
        }


        let calculatedSales : SalesInfo = salesCounter(data.purchases)
        console.log("cal sales", calculatedSales)
        if (transactionEngine(calculatedSales, 
            reward_data.claim_type, 
            reward_data.min_spent, 
            reward_data.min_items,
            reward_data.boolean_conditions,
            reward_data.value_conditions,
            data.boolean_input,
            data.value_input)){
            
            let claim_transaction : ClaimTransactions = {
                claimed_by: data.client_id, 
                processed_by: data.cashier_id, 
                sales_count: calculatedSales.sales_count, 
                sales_value: calculatedSales.sales_total
                }
        
        
                // IF ALL CHECKS ARE PASSED
                if(reward_data.claim_buckets.length < 1){
        
        
        
                    let new_bucket : ClaimBucket = {
                        claims_transactions: [claim_transaction],
                        bucket_claim_count: 1, 
                        bucket_sales_total: claim_transaction.sales_value, 
                        bucket_sales_count: claim_transaction.sales_count
                    }
        
                    
                    let bucket_data = await Claim_Bucket.create(new_bucket)
        
        
                    // INSERT BUCKET TO REWARDS
                    const bucket_id : string =  bucket_data._id.toString()
        
                    await Rewards.updateOne({_id: reward_id}, 
                        { 
                        $push: { claim_buckets: bucket_id },
                        claim_count: bucket_data.bucket_claim_count,
                        sales_total: bucket_data.bucket_sales_total,
                        sales_count: bucket_data.bucket_sales_count
                         })

                    let transaction_info : Claim_Transaction = {
                        claimed_by: data.client_id, 
                        reward: reward_id
                    }

                    await Claim_Transaction.create(transaction_info)
                }
                else {
        
                    let latest_bucket_id: string = reward_data.claim_buckets[reward_data.claim_buckets.length - 1].toString()                                    
                    
                    // UPDATE BUCKET
                    await Claim_Bucket.updateOne({_id: latest_bucket_id}, 
                        {
                            $push: { claims_transactions: claim_transaction },
                            $inc: 
                            {    
                                bucket_claim_count: 1, 
                                bucket_sales_total: claim_transaction.sales_value, 
                                bucket_sales_count: claim_transaction.sales_count
                            } 
                        }
                    )

                    // UPDATE REWARD INFO
                    await Rewards.updateOne({_id: reward_id}, 
                            {                        
                                $inc: //increment
                                {    
                                claim_count: 1, 
                                sales_total: claim_transaction.sales_value, 
                                sales_count: claim_transaction.sales_count 
                                } 
                            }
                         )
                    
                    let transaction_info : Claim_Transaction = {
                            claimed_by: data.client_id, 
                            reward: reward_id
                    }
    
                    await Claim_Transaction.create(transaction_info)
                }
        }
        else {
            console.log("Did not meet reward conditions");
            throw new Error("Did not meet reward conditions");
        }


        return NextResponse.json({
            status: 200,
            message: "CLAIM SUCCESSFUL",
        });
        
      } catch (err: any) { // Explicitly specify the type of err as any or Error
        console.log("err", err);
        return NextResponse.json({
          status: 500,
          message: err.message, // Return the error message
        });
      }
    }
