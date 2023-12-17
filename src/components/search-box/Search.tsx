import React from 'react';
import './Search.css';

const Search: React.FC<any> = () => {
  return (
    <input className="search-box" placeholder="Search within portfolio"></input>
  );
}

export default Search;