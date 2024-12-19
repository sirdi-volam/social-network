import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../../model/userSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Вы вышли из аккаунта', {
      position: 'bottom-right',
    });
    navigate('/');
  };

  return (
    <button
      className='logout-btn'
      onClick={handleLogout}
    >Выйти</button>
  )
};

export default LogoutButton;
