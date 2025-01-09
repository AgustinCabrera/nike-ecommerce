"use client";
import { log } from 'console';
import React, { useState, useEffect } from 'react';


interface UserType {
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
    uuid: string;
  };
  picture: {
    large: string;
  };
}
//<Image src={user.picture.large} alt={`${user.name.first} ${user.name.last} `} width={100} height={100} />
const User = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const data = await response.json();
        setUser(data.results[0]); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return console.error('Error fetching user');
  }

  return (
    <>
      <div className='user-container'>
        <h1>Welcome {user.name.first} {user.name.last}</h1>
        <img src={user.picture.large} alt="profileImage" />
        <p>Username: {user.login.username}</p>
        <p>Email: {user.email}</p>
      </div>
      
    </>
  );
};

export default User;
