import GithubContext from './context/GithubContext';
import './App.css';
import Header from './components/header/Header';


function App() {
  return (
    <div className="App">
      <GithubContext> 
        <Header />
      </GithubContext>
    </div>
  );
}

export default App;
