import React, { useState } from 'react';
import './SearchBar.scss';
import { useDispatch } from 'react-redux';
import { setQuery } from '../model/searchSlice';
import { SearchIcon } from '../../../shared/icons';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    dispatch(setQuery(value)); // Отправляем значение в Redux
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Поиск:', input); // Обработчик логики поиска
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Поиск..."
        className="search-bar__input"
      />
      <div type="submit" className="search-bar__icon">
        <SearchIcon />
      </div>
    </form>
  );
};

export default SearchBar;
