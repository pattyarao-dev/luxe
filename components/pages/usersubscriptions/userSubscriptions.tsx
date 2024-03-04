"use client"

import React, {useState, useEffect} from 'react'
import { ObjectId } from 'mongoose';
import User from '@/app/(models)/User';

async function getUserSubscriptions(id: ObjectId) {
  try {
    const user = await User.findById(id).exec();
    return user?.following_brands || [];
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
}

export const UserSubscriptions = ({slug}:  {slug: ObjectId}) => {
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    useEffect(() => {
    const fetchSubscriptions = async () => {
      const userSubscriptions = await getUserSubscriptions(slug);
      setSubscriptions(userSubscriptions);
    };

    fetchSubscriptions();
  }, [slug]);
  return (
    <div>
        {subscriptions.map((brandId, index) => (
            <div key={index}>{brandId}</div>
        ))}
    </div>
  )
}
