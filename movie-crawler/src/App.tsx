import React from 'react';
import './App.css';
import Header from './app/Header'
import Footer from './app/Footer'
import MoviesList from './app/MoviesList'

function App() {
  return (
    <div className="App">
      <Header />
      <MoviesList />
      <Footer />
    </div>
  );
}

export default App;
