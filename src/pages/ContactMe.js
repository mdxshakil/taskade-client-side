import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import LoadingSpinner from './LoadingSpinner';

const ContactMe = () => {
    const [user] = useAuthState(auth);
    const [messageSent, setMessageSent] = useState('');
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const handleSubmit = (e) =>{
        setLoading(true);
        e.preventDefault();
        const message = e.target.message.value;
        const userEmail = user?.email;
        const userName = user?.displayName;
        const mailDetails = {message, userEmail, userName} 
        
        fetch('http://localhost:5000/email',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(mailDetails)
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'success') {
                setLoading(false);
                setMessageSent('Email Sent!!!')
                e.target.message.value = '';
            }
            if (data.message === 'failed') {
                setLoading(false);
                setMessageSent('Failed to sent!!! Try again.')
            }
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Any suggestion?</h1>
                    <p className="py-6">If you have any query, suggestion feel free to send me an email.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Type your message</span>
                                </label>
                                <textarea type="text" placeholder="Message Body..." className="input input-bordered" name="message" id="" cols="30" rows="10" required></textarea>
                            </div>
                            {messageSent ? <p className='text-green-500'>{messageSent}</p> : <p className='text-red-500'>{messageSent}</p> }
                            <div className="form-control mt-6">
                                <input type="submit" value="Send" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMe;