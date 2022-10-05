import { async } from '@firebase/util';
import { data } from 'autoprefixer';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Await, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import LoadingSpinner from './LoadingSpinner';
import LogoutModal from './LogoutModal';

const UserProfile = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [quote, setQuote] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.quotable.io/random?tags=technology,famous-quotes')
            .then(res => res.json())
            .then(data => {
                setQuote(data)
                setDataLoading(false);
            })
    }, [])

    if (loading || dataLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const logout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">{user?.displayName}</h1>
                    <div className="avatar my-6">
                        <div className="w-24 rounded-full">
                            <img src={user?.photoURL} alt='Profile_Img' />
                        </div>
                    </div>
                    <div>
                        <p className='quote text-accent'>{quote.content}</p>
                        <small className='block'>-{quote.author}</small>
                    </div>
                    <label htmlFor="my-modal-6" className="btn modal-button btn-primary btn-sm rounded-lg my-6">LogOut</label>
                </div>
            </div>
            <LogoutModal></LogoutModal>
        </div>
    );
};

export default UserProfile;