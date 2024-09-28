import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMoralis } from "react-moralis";

const Button = styled.button`
    background-color: rgb(221, 243, 255);
    border: none;
    border-radius: 20px;
    padding: 0.75rem;
    font-size: 1.65rem;
    margin-bottom: 2rem;
    &:hover {
        background-color: rgb(180, 229, 255);
    }
`;

const Section = styled.div`
    text-align: center;
`;


export default function Login() {
    const { login, user, signup, logout, authError } = useMoralis();

    const [show, setShow] = useState(undefined);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const showLogIn = () => setShow("login");
    const showSignUp = () => setShow("signup");

    const handleLogIn = async() => {
      try{
        await login(username, password);
      }catch(err){
        console.log(err)
        alert(err);
      }
    }

    const handleSignUp = async() => {
      try{
        if(!username) return alert("Please fill in username!")
        if(!password) return alert("Please fill in password!")
        if(!email) return alert("Please fill in email!")

        await signup(username, password);
      }catch(err){
        console.log(err)
        alert(err);
      }
    }

    useEffect(() => {
        if(user) alert("Logged in!")
    }, [user]);

    useEffect(() => {
      if(authError) alert(authError.message)
    }, [authError]);

    return (
      <Section>
        <h3>Log In to see you portfolio:</h3>

        {show == "login" ? (
          <>
            <input placeholder='Username' value={username} onChange={handleUsernameChange} /><br/>
            <input placeholder='Passwors' value={password} onChange={handlePasswordChange} /><br/>
            <Button onClick={handleLogIn}>Log In</Button><br/>
          </>
        ):(
          show=="signup" ? (
            <>
              <input placeholder='Username' value={username} onChange={handleUsernameChange} /><br/>
              <input placeholder='Passwors' value={password} onChange={handlePasswordChange} /><br/>
              <input placeholder='Email' value={email} onChange={handleEmailChange} /><br/>
              <Button onClick={handleSignUp}>Sign Up</Button><br/>
            </>
          ):null
        )}

        <Button onClick={showLogIn}>Log In</Button>
        <span>or</span>
        <Button onClick={showSignUp}>Sign Up</Button>
      </Section>
    );
}