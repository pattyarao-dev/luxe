"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface UserCardProps {
  id: string,
  first_name: string,
  last_name: string,
  user_type: string;
}


const UserCard: React.FC<UserCardProps> = ({ id, first_name, last_name, user_type }) => {
  const [assignedbranch, setAssignedBranch] = useState<any>()

  useEffect(() => {
    async function fetchUserData() {
      try {
          const response = await fetch(`/api/user?id=${id}`)
          if (response.ok) {
              const data = await response.json()
              setAssignedBranch(data.user.assigned_branch)
              console.log(data)
          }
      } catch (error) {
          console.error('Error while fetching user:', error)
      }
    }
    if (id){
      fetchUserData(); 
    }
  }, [id])

  console.log(assignedbranch)


  return (
    <div className="branch-card flex w-full justify-between mb-4">
        <div className='w-full flex flex-row items-center gap-2'>
            <div className="w-[7%] h-[55px] rounded-md flex items-center justify-center bg-gray-main h-full">
                <Image src="/cuate.png" width={80} height={80} alt="reward image" className='p-2'></Image>
            </div>
            <div className="w-[60%] flex flex-col">
                <div>
                    <h1 className="font-semibold">{first_name} {last_name}</h1>
                    <p className="text-xs">{user_type}</p>
                    
                    {user_type === 'CASHIER' && (
                      <div>
                        <p className='text-xs'>{assignedbranch}</p>
                      </div>
                    )}
                </div>
            </div>
        </div>
        <span className="bg-green-100 text-green-800 flex items-end font-medium px-10 py-1.5 rounded-md dark:bg-green-900 dark:text-green-300">Active</span>
    </div>
  );
};

export default UserCard;