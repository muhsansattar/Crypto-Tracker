import React, { Component } from 'react';
import logo from "./logo.svg";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderHTML = styled.header`
    background-color: #282c34;
    min-height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    position: sticky;
    top: 0;
    padding-left: 5vw;
    z-index: 10;
`;
const H1 = styled.p`
    color: white;
    transform: translate(23px, 20px);
    font-weight: 800;
    font-size: 3rem;
`;
const Img = styled.img`
    height: 4rem;
    pointer-events: none;
    transform: translate(25px, 25px);
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 20px;
    padding: 0.75rem;
    font-size: 1.65rem;
    margin-bottom: 2rem;
    color: white;
    &:hover {
        color: black;
        background-color: rgb(221, 243, 255);
    }
`;

const Logo = styled.div`
    display: flex;
    felx-direction: row;
`;

const Buttons = styled.div`
    color: black;
    margin-right: 5vw;
    transform: translate(0px, 16px);
`;

const ButtonLeft = styled(Button)`
    margin-left: 1.5rem;
`;  


export default class Header extends Component {
    render() {
        return (
            <HeaderHTML>
                <Link to="/top">
                    <Logo>
                        <Img 
                            src={logo}
                            alt="React Logo"
                        />
                        <H1>Crypto Price Tracker</H1>
                    </Logo>
                </Link>
                <Buttons>
                    <Link to="/top">
                        <Button>Top 250</Button>
                    </Link>
                    <Link to="portfolio">
                        <ButtonLeft>Portfolio</ButtonLeft>
                    </Link>
                </Buttons>
          </HeaderHTML>
        )
    }
}
