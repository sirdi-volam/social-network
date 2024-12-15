import { useState } from 'react';
import './Login.scss';
import { useAuthStore } from '../../store/authUser';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Для отображения ошибки

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Очистка предыдущей ошибки
    setError(null);


    try {
      await login({ email, password }, () => {
        toast.success('Успешный вход');
        navigate('/'); // Перенаправление только при успехе
      });
    } catch (err) {
      toast.error('Ошибка входа:', err);
      setError('Неправильный логин или пароль'); // Установить сообщение об ошибке
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Вход</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Логин или почта"
            required
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            required
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-agreement">
            <input type="checkbox" className="login-agreement__checkbox" />
            <p className="login-agreement__text">Запомнить меня</p>
          </div>
          {error && <p className="login-error">{error}</p>} {/* Ошибка отображается здесь */}
          <button type="submit" className="login-button" disabled={isLoggingIn}>
            {isLoggingIn ? 'Вход...' : 'Войти'}
          </button>
          <div className="login-footer">
            <Link to="/forgot-password" className="login-text__link-forgotPassword">Забыли пароль?</Link>
            <p className="login-text">
              Нет аккаунта? <Link className="login-text__link" to="/register">Зарегистрироваться</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
