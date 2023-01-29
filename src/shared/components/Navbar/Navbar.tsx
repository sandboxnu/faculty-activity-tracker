import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { resetForm } from '../../../store/form.store';
import neuLogo from '../../../media/neuLogo.svg';
import profileIcon from '../../../media/profileIcon.svg';
import './Navbar.scss';

const Navbar: React.FC = () => {
    const dispatch = useDispatch()
    return (
        <div className="navbar-container">
            <img src={neuLogo} alt="CAMD Logo"/>
            <NavLink className={({ isActive }) => isActive ? 'active': 'not-active'} to='/dashboard'>Dashboard</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active': 'not-active'} to='/new-activity' onClick={() => dispatch(resetForm())}>Submit a New Activity</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active': 'not-active'} to='/submissions'>Submissions</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active': 'not-active') + ' inline-icon'} to='/profile'> <img src={profileIcon} alt="Profile Icon"/> My Profile</NavLink>  
        </div>
    )
};


export default Navbar;