import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { useMoralis } from "react-moralis";
import Login from './Login';
import Account from './Account';
import Balance from './Balance';

const Section = styled.section`
    margin-top: 4rem;
    font-size: 2rem;
    text-align: left;
    padding-left: 5vw;
    padding-right: 5vw;
`;
const Strong = styled.strong`
    margin-right: 2rem;
`;
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


export default function AccountBalance(props) {
    const buttonText = props.showBalance ? "Hide Balances" : "Show Balances"
    const renderBalance = props.showBalance ? <span><Strong>Account Balance:</Strong><span>{props.amount}€</span></span> : null;

    const { user } = useMoralis();

    return (
        <Section>
            {user ? (
                <Balance coins={props.coins} />            
            ):(
                <Login />
            )}
        </Section>
    );
}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}