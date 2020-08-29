import React from 'react';
import logo from '../yellow-smile-noborder-icon.png';
import '../App.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="common-content">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Congrats both of you!</h2>
          <h2>Do you want to reveal your baby gender?</h2>
          <Link to="/getDetails">
            <KeyboardArrowDownIcon style={{ fontSize: 56 }} className="down-btn" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
