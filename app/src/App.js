import React, { useEffect, useState } from 'react';
import './App.css';
import ShortLink from './components/shortLink';
import CodeQR from './components/codeQR';
function App() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="App dark-mode" style={{display:'flex', height:'100vh'}}>
      <div className="card text-center" style={{margin: 'auto', width:'50%'}}>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item" style={{cursor:"pointer"}}>
              <a className={isActive ? "nav-link active" : "nav-link"} onClick={(e)=>{setIsActive(true)}} >Lien</a>
            </li>
            <li className="nav-item" style={{cursor:"pointer"}}>
              <a className={!isActive ? "nav-link active" : "nav-link"} onClick={(e)=>{setIsActive(false)}}>Code QR</a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {
            isActive ? <ShortLink /> : <CodeQR />
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
