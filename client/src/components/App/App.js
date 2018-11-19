import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
