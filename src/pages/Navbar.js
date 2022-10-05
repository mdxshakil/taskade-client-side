import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const themeValues = ["light", "dark", "synthwave", "forest", "aqua", "black", "night"]
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <div>
            <div className="btm-nav grid grid-cols-4 lg:grid-cols-3 place-items-center">
                <h1 onClick={()=>navigate('/')} className=' font-bold text-2xl bottom-nav-button' >
                    <span className="btm-nav-label">tasKade</span>
                </h1>
               {location.pathname !== '/' && <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden bottom-nav-button">Menu</label>}
                <div className="form-control p-0">
                    <input type="text" placeholder="Search" disabled className="input input-bordered p-0 w-28 sm:w-28 lg:w-60" />
                </div>
                <select className='input input-bordered w-24 p-0 border-0 theme-selector' data-choose-theme>
                    {
                        themeValues.map(theme =>
                            <option key={theme} value={theme}>{theme}</option>)
                    }
                </select>
            </div>
        </div>
    );
};

export default Navbar;