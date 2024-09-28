import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMoralis } from "react-moralis";

const Button = styled.button`
    background-color: rgb(221, 243, 255);
    border: none;
    border-radius: 20px;
    padding: 0.5rem;
    font-size: 1.25rem;
    margin-bottom: 2rem;
    &:hover {
        background-color: rgb(180, 229, 255);
    }
`;

const P = styled.span`
    font-size: 1rem;
    margin-right: 2rem;
`;

const Username = styled.span`
    font-size: 1.5rem;
    margin-right: 2rem;
`;

const Acc = styled.div`
    background-color: #a1deff;
    border-radius: 1.5rem;
    padding: 0.75rem;
    padding-bottom: 0;
`;

export default function Account() {
    const { user, logout } = useMoralis();

    const handleLogOut = async() => {
      try{
        await logout();
        alert("Logged Out!");
      }catch(err){
        console.log(err)
        alert(err);
      }
    }

    return (
      <Acc>
          <Username>{user.get("username")}</Username>
          <Button onClick={handleLogOut}>Log Out</Button>
      </Acc>
    );
}