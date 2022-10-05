import { async } from '@firebase/util';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const useToken = (newUser) => {
    const [token, setToken] = useState('');
    const [user] = useAuthState(auth);

    useEffect(() => {
        const name = newUser?.name;
        const email = user?.email;
        const image = newUser?.profilePicture;
        const isVerified = user?.emailVerified;
        const createdAt = user?.metadata.creationTime;
        const lastLoginAt = user?.metadata.lastSignInTime;
        
        const currentUser = {
            name: name || newUser?.user?.displayName,
            email: email,
            image: image || newUser?.user?.photoUrl,
            isVerified: isVerified,
            createdAt: createdAt,
            lastLoginAt: lastLoginAt
        }

        if (user && newUser) {
            const sendUserToDb = async () => {
               await fetch(`http://localhost:5000/users/${email}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        const accessToken = data.token;
                        localStorage.setItem('accessToken', accessToken);
                        setToken(accessToken);
                    })
            }
            sendUserToDb();
        }

    }, [newUser, user]);
    return [token];
};

export default useToken;