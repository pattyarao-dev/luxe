import User from "@/app/(models)/User";
import Rewards from "../(models)/Rewards";
import Brand from "../(models)/Brand";

function findMissingElements(array1: string[], array2: string[]): string[] {
    // Using Set for faster lookup
    const set1: Set<string> = new Set(array1);
    
    // Filter elements present in array2 but not in array1
    const missingElements: string[] = array2.filter(element => !set1.has(element));
    
    return missingElements;
}

export async function TagsHelper(client_id: string, target_id: string, target_id_type: string) {

    try {
        const user_data = await User.findById(client_id)

        let user_preference : string[] = user_data.preference_tags

        console.log("CLIENT: ", user_preference)
        
        let target_preference : string[] 

        if(target_id_type === "REWARD"){
            const reward_data = await Rewards.findById(target_id)
            let target_preference = reward_data.reward_tags
            console.log("TARGET: ", target_preference)
            let new_preferences : string[] = findMissingElements(user_preference, target_preference)
            console.log("RESULT: ", new_preferences)

            if(new_preferences.length > 0){
                await User.updateOne({_id: client_id}, 
                    {
                        $push: { preference_tags: new_preferences}
                    }
                    )
            }
            else {
                console.log("No New Preferences Recorded")
            }

        }
        else if (target_id_type === "BRAND"){
            const brand_data = await Brand.findById(target_id)
            let target_preference = brand_data.brand_tags 
            console.log("TARGET: ", target_preference)
            let new_preferences : string[] = findMissingElements(user_preference, target_preference)
            console.log("RESULT: ", new_preferences)

            if(new_preferences.length > 0){
                await User.updateOne({_id: client_id}, 
                    {
                        $push: { preference_tags: new_preferences}
                    }
                    )
            }
            else {
                console.log("No New Preferences Recorded")
            }
        }

                

    } catch (error) {
        console.log(error)
    }
    

}