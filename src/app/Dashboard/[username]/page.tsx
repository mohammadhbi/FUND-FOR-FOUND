"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/lib/axios';
import Navbar from '@/app/components/Navbars component/Navbar';
import SideBar from '../components/SideBar';

export default function Page() {
  const { username } = useParams();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const usernamels = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    // console.log('usernameUrl:', username);
    // console.log('username:', usernamels);

    if (!username || !token) {
      setIsValid(false);
      return;
    }

    if (username !== usernamels) {
      setIsValid(false);
      return;
    }

    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
    //   console.log('userId:', userId);
      if (!userId) {
        setIsValid(false);
        return;
      }
      try {
         await client.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('API Response:', response.data);
        setIsValid(true);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsValid(false);
      }
    };
    fetchUser();
  }, [username]);

  if (isValid === null) {
    return <div className="flex items-center justify-center">
  <div className="w-30 h-30 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin flex justify-center items-center mt-50"></div>
</div>;
  }

  if (!isValid) {
    return <h1>Unauthorized: Username mismatch or invalid token</h1>;
  }

  return(<div>
      <Navbar/>
      <SideBar/>

  </div>
  );
}