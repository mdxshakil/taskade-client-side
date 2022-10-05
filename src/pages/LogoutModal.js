import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const LogoutModal = () => {
    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div className='logout-modal-container'>
            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box mb-16 sm:mb-16 lg:mb-0">
                    <h3 className="font-bold text-lg">Are you sure you want to logout?</h3>
                    <p className="py-4">Once you logout, you can not see your task lists.</p>
                    <div className='flex justify-end'>
                        <div className="modal-action mx-4">
                            <label htmlFor="my-modal-6" className="btn btn-success">Cancel</label>
                        </div>
                        <div className="modal-action">
                            <button onClick={logout} className="btn btn-error">LogOut</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LogoutModal;