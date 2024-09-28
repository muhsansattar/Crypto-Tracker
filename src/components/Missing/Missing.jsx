import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Button = styled.button`
    background-color: rgb(221, 243, 255);
    border: none;
    border-radius: 20px;
    padding: 0.75rem;
    font-size: 1.65rem;
    margin-bottom: 2rem;
    color: black;
    margin: 3vh;
    &:hover {
        background-color: rgb(180, 229, 255);
    }
`;

const H1 = styled.h1`
    margin-top: 10vh;
    font-size: 5rem;
    font-weight: 800;
`;


const Missing = () => {
  return(
    <>
      <H1>Missing Page!</H1>

      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/portfolio">
        <Button>Portfolio</Button>
      </Link>
    </>
  )
}

export default Missing;