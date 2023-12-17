import './App.css';
import React from 'react';
import Header from './components/header/Header';
import Page from './components/page/page';


const App: React.FC<any> = () => {
  return (
    <div className="App">
      <Header />
      <Page />
    </div>
  );
}

export default App;
