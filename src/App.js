import logo from './logo.svg';
import './App.css';
import ButtonUsage from './components/button';
import MyChrono from './components/chrono/chronoTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    <ButtonUsage />
    <h3>Numismatique </h3>
    <MyChrono className="Chrono"/>
    </div>
  );
}

export default App;
