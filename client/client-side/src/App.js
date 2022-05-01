import logo from './logo.svg';
import './App.css';
import {PlayerForm, Clicker, NameDisplayer} from './components_js/formUser'

function App() {

  return (
    <div className="App">
      <div className="Main-Form">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <PlayerForm />
      </div>
    </div>
  );
}

export default App;
