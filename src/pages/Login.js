import React from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from '../firebase.init';
import useToken from './hook/useToken';
import LoadingSpinner from './LoadingSpinner';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    let errorElement;
    if (error) {
        errorElement = <p className='text-red-500 font-bold text-sm'>{error?.message}</p>
    }
    if (user) {
        navigate(from, {replace:true})
    }

    const onSubmit = async (data) => {
        await signInWithEmailAndPassword(data.email, data.password);
    };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login Now!</h1>
                        <p className="py-6">Hey! Glad to see you are back. Login to your account.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                {/* email input */}
                                <div className="form-control">
                                    <input type="email" placeholder="Email" className="input input-bordered"
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message: 'This field can not be empty!'
                                            }
                                        })} />
                                </div>
                                {errors.email?.type === 'required' && <p className='text-red-500 font-bold text-sm'>{errors.email?.message}</p>}
                                {/* password input */}
                                <div className="form-control">
                                    <input type="password" placeholder="Password" className="input input-bordered"
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: 'This field can not be empty!'
                                            }
                                        })} />
                                </div>
                                {errors.password?.type === 'required' && <p className='text-red-500 font-bold text-sm'>{errors.password?.message}</p>}
                                {errorElement}
                                <Link to='/register'>Don't have an account?</Link>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                                <Link className='text-center underline' to='/'>Go back to homepage</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;