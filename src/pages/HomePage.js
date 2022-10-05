import React from 'react';
import TSparticles from './TSparticles';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import LoadingSpinner from './LoadingSpinner';

const HomePage = () => {
    const[user,loading] = useAuthState(auth);
    const navigate = useNavigate();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    
    return (
        <div>
            <TSparticles></TSparticles>
            <div className="hero min-h-screen" >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        { user && <h3 className='text-2xl text-accent font-bold'>Hello, {user?.displayName}</h3>}
                        <h1 className="mb-5 text-4xl font-bold">Forget Your Task Often?</h1>
                        <p className="mb-5">Well, say no more. Take a note of your upcoming taks right now.</p>
                        <button onClick={()=>navigate('/dashboard')} className="btn btn-primary btn-sm">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;