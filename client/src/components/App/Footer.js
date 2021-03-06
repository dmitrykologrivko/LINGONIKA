import React from 'react';
import {connect} from "react-redux";

import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <nav className="footer__footer_nav">
            <a className="footer_nav__item" href="terms-of-trade">Terms of Trade</a>
            <a className="footer_nav__item" href="api-docs">API documentation</a>
          </nav>
        </div>
      </footer>
    )
  }
}

export default connect()(Footer);
