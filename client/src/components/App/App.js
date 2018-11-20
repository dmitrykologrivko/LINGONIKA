import React from 'react';

import {connect} from "react-redux";

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
}

export default connect()(App);
