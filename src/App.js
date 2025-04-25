import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to={'/admin'}>Go to dashboard</Link>
      </header>
    </div>
  );
}

export default App;
