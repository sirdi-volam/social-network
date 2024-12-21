import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../../entities/user/model/userSlice';

import './Logout.scss';
import { LogoutIcon } from '../../shared/icons';


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem('user');

    toast.success('Вы вышли из аккаунта');
    navigate('/');
  };

  return (
    <div className="logout-btn">
      <div
        className='logout-btn__button'
        onClick={handleLogout}
      >
        <div className="logout-btn__icon">
          <LogoutIcon />
        </div>
        Выйти</div>
    </div>
  )
};

export default Logout;
