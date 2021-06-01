import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/UI/index.js';
import './style.css';
import { signup} from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {

  const[firstName, setFirsName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  
  const registerUser = (e) => {

    e.preventDefault();

    const user = {
      firstName, lastName, email, password
    }

    dispatch(signup(user))
  }

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }

  return(
    <Layout>
        <div className="registerContainer">
          <Card>
            <form onSubmit={registerUser}>
              <h3>Sign Up</h3>

              <input
                  name="firstName" 
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirsName(e.target.value)}
                  placeholder="First Name"
                />
                <input
                  name="lastName" 
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                <input
                  name="email" 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  name="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />

                <div>
                  <button>Sign Up</button>
                </div>
            </form>
          </Card>
        </div>
    </Layout>
   )

 }

export default RegisterPage