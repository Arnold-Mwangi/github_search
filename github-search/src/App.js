import GithubContext from './context/GithubContext';
import './App.css';
import Header from './components/header/Header';
import Profile from './components/Profile/ProfileDisplay';
import Repos from './components/repos/Repos';


function App() {
  return (
    <div className="App">
      <GithubContext> 
        <Header />
        <Profile />
        <Repos />
        
      </GithubContext>
    </div>
  );
}

export default App;
