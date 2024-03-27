'use client'
import React, { useEffect, useState } from 'react';

interface QRContentProps {
    clientid: string;
    rewardid: string;
    cashierid: string;
}

interface Freebie {
    name: string;
    qty: number;
}

interface Purchase {
    qty: number;
    price: number;
}

interface BooleanCondition {
    question_description: string;
    value: boolean;
    _id: string;
}

interface ValueCondition {
    question_description: string;
    operator: string;
    value: number;
    _id: string;
}


const RewardVerificationForm: React.FC<QRContentProps> = ({ clientid, rewardid, cashierid }) => {
    const [reward, setReward] = useState<any>(null); // State to hold the fetched reward
    const [purchases, setPurchases] = useState<Purchase[]>([{ qty: 0, price: 0 }]);
    const [booleanInput, setBooleanInput] = useState<boolean[]>([]);
    const [valueInputs, setValueInputs] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null); // New state to hold error
    const [freebies, setFreebies] = useState<Freebie[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const fetchReward = async () => {
            try {
                // Fetch reward data from the API endpoint
                const response = await fetch(`/api/reward/get?rewardid=${rewardid}&clientid=${clientid}&cashierid=${cashierid}`);
                const data = await response.json();
                
                if (!data.reward) {
                    throw new Error(data.message);
                }
                
                setReward(data.reward);
                
            } catch (error) {
                
                console.log('Error fetching reward:', error);
                if (error instanceof Error) {
                    setError(error.message); // Set error state with error message
                } else {
                    setError('Unknown error occurred'); // Set a generic error message
                }
                setReward(null);
            }
        };

        fetchReward(); // Call the fetchReward function
    }, [rewardid]);

    const handlePurchaseFormChange = (index : any, event : any) => {
        let data = [...purchases];
        data[index][event.target.name as keyof Purchase] = parseFloat(event.target.value);
        setPurchases(data);
    }

    const handleBooleanInputChange = (index: number, value: boolean) => {
        const updatedBooleanInput = [...booleanInput];
        updatedBooleanInput[index] = value;
        setBooleanInput(updatedBooleanInput);
    };

    const handleValueInputChange = (index: number, value: number) => {
        const newValues = [...valueInputs];
        newValues[index] = value;
        setValueInputs(newValues);
    };

    const addFields = () => {
        let newfield: Purchase  = { qty: 0, price: 0 }

        setPurchases([...purchases, newfield])
    }

    const removeFields = (index: any) => {
        let data = [...purchases];
        data.splice(index, 1)
        setPurchases(data)
    }

    const submit = (e: any) => {
        e.preventDefault();

        const postData = {
            client_id: clientid,
            cashier_id: cashierid,
            purchases: purchases, 
            boolean_input: booleanInput,
            value_input: valueInputs
        };

        console.log(postData)

        fetch(`/api/reward/verify?id=${rewardid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                // Brand added successfully, close the modal or perform any other actions
                console.log("REWARD HAS BEEN REDEEMED`: ", response)
                setFormSubmitted(true);
            } else {
                // Handle errors if any
                console.error('REWARD DID NOT VERIFY:', response);
            }
        })
        .catch(error => {
            console.error('Error while VERIFYING REWARD:', error);
        });
        
    }

    return (
        <>
            <h2>Scanned QR Content:</h2>
            <p>Client ID: {clientid}</p>
            <p>Reward ID: {rewardid}</p>
            {reward && (
                <div>
                    <h3>Reward Details:</h3>
                    <p>Name: {reward.reward_name}</p>
                    <p>Brand: {reward.brand_name}</p>
                    {/* Add more reward details here as needed */}
                </div>
            )}
            {reward && reward.min_spent !== 0 && reward.min_items !== 0 && (
                <div>
                    <form onSubmit={submit}>
                        {purchases.map((purchase, index) => {
                        return (
                            <div key={index}>
                            <label>Item Quantity: </label>
                            <input
                                name='qty'
                                placeholder='Item Quantity'
                                type='number'
                                min={0}
                                step={1}
                                value={purchase.qty}
                                onChange={event => handlePurchaseFormChange(index, event)}
                            />
                            <label>Item Price: </label>
                            <input
                                name='price'
                                placeholder='Item Price'
                                type='number'
                                min={0}
                                step={0.01}
                                value={purchase.price}
                                onChange={event => handlePurchaseFormChange(index, event)}
                            />
                            <button onClick={() => removeFields(index)}>Remove</button>
                            </div>
                            
                            
                        )
                        })}
                    </form>
                    <button onClick={addFields}>Add More..</button>

                </div>
            )}

            {reward && reward.boolean_conditions && reward.boolean_conditions.length > 0 && (
                            <div>
                                <h4>Answer the Following Questions:</h4>
                                <form onSubmit={submit}>
                                    {reward.boolean_conditions.map((condition: BooleanCondition, index: number) => (
                                        <div key={condition._id}>
                                            <p>{condition.question_description}</p>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="true"
                                                    checked={booleanInput[index] === true}
                                                    onChange={() => handleBooleanInputChange(index, true)}
                                                />{' '}
                                                Yes
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="false"
                                                    checked={booleanInput[index] === false}
                                                    onChange={() => handleBooleanInputChange(index, false)}
                                                />{' '}
                                                No
                                            </label>
                                        </div>
                                    ))}
                                </form>
                            </div>
            )}

            {reward && reward.value_conditions && reward.value_conditions.length > 0 && (
                <div>
                    <form onSubmit={submit}>
                        {reward.value_conditions.map((condition: ValueCondition, index: number) => (
                            <div key={condition._id}>
                                <p>{condition.question_description}</p>
                                <input
                                    type="number"
                                    value={valueInputs[index] || ''}
                                    onChange={(e) => handleValueInputChange(index, parseFloat(e.target.value))}
                                />
                            </div>
                        ))}
                        
                    </form>
                </div>
            )}

            {reward && (
                <div>
                    <button onClick={submit}>Submit</button>
                </div>
            )}
            
            {error && <p>Error: {error}</p>}


            {formSubmitted && ( // Render freebies or discount only after form submission
                <div>
                    <h1>Reward Claim Successful!</h1>
                    {reward.freebies.length > 0 && (
                        <div>
                            <h3>Freebies:</h3>
                            <ul>
                                {reward.freebies.map((freebie : Freebie, index : number) => (
                                    <li key={index}>{freebie.qty}x {freebie.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {reward.discount !== null && (
                        <div>
                            <h3>Please Apply Discount:</h3>
                            <p>{reward.discount}% off</p>
                        </div>
                    )}
                </div>
            )}
        </>

    );
};

export default RewardVerificationForm;
