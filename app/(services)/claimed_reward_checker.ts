import User from "@/app/(models)/User";
import Rewards from "@/app/(models)/Rewards";
import Claim_Bucket from "../(models)/Claim_Bucket";
import { transactions } from "./transactions";


export async function checkIfClaimedRewardByID(client_id: String, reward_id: String): Promise<any> {

    let reward_transactions: any[] = await transactions(reward_id);

    for (let i = 0; i < reward_transactions.length; i++) {
        if (reward_transactions[i].claimed_by.toString() === client_id) {
            console.log('Client has claimed this reward.');
            return true;
        } 
    }

    console.log('Client has not claimed this reward.');
    return false;
}