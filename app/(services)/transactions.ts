import Rewards from "@/app/(models)/Rewards";
import Claim_Bucket from "../(models)/Claim_Bucket";

export async function transactions(reward_id: String): Promise<object[]> {

    let reward_transactions : object[] = []
    let reward_data = await Rewards.findById(reward_id); 
    let claim_data = await Claim_Bucket.find({ _id: { $in: reward_data.claim_buckets } });

    for (let i = 0; i < claim_data.length; i++) {

        let transaction_bucket = claim_data[i].claims_transactions
        for (let j = 0; j < transaction_bucket.length; j++) {

            reward_transactions.push(transaction_bucket[j])
        }
     
    }


    return reward_transactions;
}