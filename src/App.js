import logo from './logo.svg';
import {useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PriveteRoute';
import {useDispatch, useSelector} from 'react-redux';
import {isLoggedInUser} from  './actions';


//route

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isLoggedInUser())
    }
  }, []);
  




  return (
    <div className="App">
      <Router>
        {/* Rota privada para usuario logado */}
        <PrivateRoute path="/" exact component={HomePage}/>

        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={RegisterPage}/>
      </Router>
    </div>
  );
}

export default App;
