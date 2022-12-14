import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../firebase.init';

const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <!-- Page content here --> */}
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-52 bg-base-100 border-2 text-base-content">
                <h1 className='mb-0 pb-0 text-2xl font-bold'>{user?.displayName}</h1>
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Notes</Link></li>
                    <li><Link to='archieve'>Archive</Link></li>
                    <li><Link to='profile'>My Profile</Link></li>
                    <li><Link to='contact'>Contact Us</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;