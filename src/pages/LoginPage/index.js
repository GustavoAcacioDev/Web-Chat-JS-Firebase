import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/index.js';
import { isLoggedInUser, signin } from '../../actions'

import './style.css'
import { Redirect } from 'react-router';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  //useEffect(() => {
  //  if(!auth.authenticated){
  //    dispatch(isLoggedInUser())
  //  }
  //}, []);

  const userLogin = (e) => {

    e.preventDefault();

    if(email == ""){
      alert("É necessario um e-mail")
      return
    }
    if(password == ""){
      alert("É necessario digitar uma senha")
      return
    }

    dispatch(signin({email, password}));
   
  }

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }

  return(
    <Layout>
        <div className="loginContainer">
          <Card>
            <form onSubmit={userLogin}>
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
                <button>Login</button>
              </div>
            </form>
          </Card>
        </div>
    </Layout>
   )
}

export default LoginPage