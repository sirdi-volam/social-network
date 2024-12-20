import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../entities/user/model/userSlice';
import axiosInstance from '../../shared/api/axiosInstance';
import toast from 'react-hot-toast';
import { PasswordActiveIcon, PasswordHiddenIcon } from '../../shared/icons';

import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      const userData = response.data;

      dispatch(login(userData));

      document.cookie = `
        token=${userData.token};
        path=/;
        expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toUTCString()};
        secure;
        samesite=lax;
        httpOnly
      `;

      localStorage.setItem('user', JSON.stringify(userData));

      toast.success('Вы успешно вошли');

      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Вход</h1>
        <form onSubmit={handleLogin} className='login-form'>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='login-input'
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='login-input'
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <PasswordHiddenIcon /> : <PasswordActiveIcon />}
            </button>
          </div>
          <button className='login-btn' type="submit">Войти</button>
          <div className="register-agreement">
            <p className="register-agreement__text">
              Нет аккаунта?
              <Link to="/register" className="register-agreement__link">
                Регистрация
              </Link>
            </p>
          </div>
          <div className="toHome">
            <Link to="/" className="toHome__link">
              На главную
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
