import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import LoadingSpinner from './LoadingSpinner';
import useToken from './hook/useToken';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorElement, setErrorElement] = useState('')
    const [currentUser, setCurrentUser] = useState({});
    const [token] = useToken(currentUser);

    if (loading || updating) {
        return <LoadingSpinner></LoadingSpinner>
    }

    let errorMessage;
    if (error || updateError) {
        errorMessage = <p className='text-sm font-bold text-red-500'>{error?.message || updateError?.message}</p>;
    }
    if (token) {
        console.log('success');
    }
    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            setErrorElement('Password doesnot match!')
            return;
        }
        const image = data.profileImg[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageStorageKey = '07a949658edb71730e18937d8f9eece4'

        const createUser = () => {
            fetch(`https://api.imgbb.com/1/upload?key=${imageStorageKey}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(async (result) => {
                    if (result.success) {
                        const profilePicture = result.data.url;
                        const newUser = {
                            name: data.name,
                            profilePicture: profilePicture,
                            email: data.email
                        }
                        setCurrentUser(newUser);
                        await createUserWithEmailAndPassword(data.email, data.password)
                        await updateProfile({ displayName: data.name, photoURL: profilePicture })
                    }
                })
        }
        createUser();

    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Create an acount!</h1>
                        <p className="py-6">create an account and start taking notes for your next project.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                {/* name input */}
                                <div className="form-control">
                                    <input type="text" placeholder="Enter your name" className="input input-bordered"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Name is required!'
                                            },
                                            pattern: {
                                                value: /^([a-zA-Z ]){2,30}$/,
                                                message: 'Invalid name input!'
                                            }
                                        })} />
                                    {(errors.name?.type === 'required' || errors.name?.type === 'pattern') && <p className='text-red-500 font-bold text-sm'>{errors.name?.message}</p>}
                                </div>
                                {/* email input */}
                                <div className="form-control">
                                    <input type="email" placeholder="Enter your email" className="input input-bordered"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email is required!'
                                            },
                                            pattern: {
                                                value: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
                                                message: 'Invalid email input!'
                                            }
                                        })} />
                                    {(errors.email?.type === 'required' || errors.email?.type === 'pattern') && <p className='text-red-500 font-bold text-sm'>{errors.email?.message}</p>}
                                </div>
                                {/* password input */}
                                <div className="form-control">
                                    <input type="password" placeholder="Password" className="input input-bordered"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'password is required!'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be atlest 6 chracters!'
                                            }
                                        })} />
                                    {(errors.password?.type === 'required' || errors.password?.type === 'minLength') && <p className='text-red-500 font-bold text-sm'>{errors.password?.message}</p>}
                                </div>
                                {/* confirm password input */}
                                <div className="form-control">
                                    <input type="password" placeholder="Confirm Password" className="input input-bordered"
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: 'This field is required!'
                                            }
                                        })} />
                                    {(errors.confirmPassword?.type === 'required') && <p className='text-red-500 font-bold text-sm'>{errors.confirmPassword?.message}</p>}
                                    {errorElement && <p className='text-red-500 font-bold text-sm'>{errorElement}</p>}
                                </div>
                                {/* image input */}
                                <div className="form-control">
                                    <input type="file" accept=".png, .jpg, .jpeg" className="input input-bordered" {...register('profileImg', {
                                        required: {
                                            value: true,
                                            message: 'Profile picture is required!'
                                        }
                                    })} />
                                    {errors.profileImg?.type === 'required' && <p className='text-red-500 font-bold text-sm'>{errors.profileImg?.message}</p>}
                                </div>
                                {errorMessage}
                                <Link to='/login'>Already have an account?</Link>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Create Account</button>
                                    <Link className='text-center underline' to='/'>Go back to homepage</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;