import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../../entities/user/model/userSlice';


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
    <button
      className='logout-btn'
      onClick={handleLogout}
    >Выйти</button>
  )
};

export default Logout;
