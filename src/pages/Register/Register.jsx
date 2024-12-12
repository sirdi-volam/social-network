import { useState } from 'react'
import './Register.scss'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authUser.js';

export const Register = () => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signup, isLoading, status } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Простая валидация перед отправкой
    if (!email || !login || !password) {
      setError("Все поля обязательны для заполнения.");
      return;
    }

    try {
      await signup({ email, login, password });
      setError(null); // Очистка ошибок после успешной регистрации
    } catch (err) {
      setError("Не удалось зарегистрироваться. Попробуйте снова.");
    }
  };
  return (
    <div className="register-container">
      <div className="register">
        <h1 className="register-title">Регистрация</h1>
        <form className="register-form" onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Логин или почта"
            required
            className="register-input"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Имя пользователя"
            required
            className="register-input"
            value={login}
            onChange={(ev) => setLogin(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            required
            className="register-input"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          {error && <p className="register-error">{error}</p>}

          <div className="register-checkbox">
            <input
              type="checkbox"
              className="register-checkbox-input"
              required
            />

            <p className="register-checkbox__text">
              Я согласен с
              <Link
                to="/policy"
                className="register-checkbox__link"
              >
                Политикой конфиденциальности
              </Link>
            </p>
          </div>
          <button type="submit" className="register-button" disabled={isLoading && status === "signup"}>
            {isLoading && status === "signup" ? "Загрузка..." : "Зарегистрироваться"}
          </button>
          <div className="register-agreement">
            <p className="register-agreement__text">
              Уже зарегистрированы?
              <Link to="/login" className="register-agreement__link">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
