import React from 'react';
import './Aside.scss';

const Aside = ({ links }) => {
  return (
    <aside className="aside">
      <nav className="aside__nav">
        <ul className="aside__list">
          {links.map(link => (
            <li key={link.id} className="aside__item">
              <a href={link.path} className="aside__link">
                <link.icon /> {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
