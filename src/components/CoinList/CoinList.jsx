import React, { Component, useState } from 'react';
import Coin from "../Coin/Coin";
import styled from 'styled-components';
import 'antd/dist/antd.css';


const Table = styled.table`
  margin: 30px auto 50px auto;
  display: inline-block;
  font-size: 1.4rem;
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 2vh;
`;

const Th = styled.th`
`;

const Input = styled.input`
margin-right: auto;
    margin-top: 7.5vh;
    text-align: left;
    display: flex;
    justify-self: left;
    margin-left: 9vw;
    line-height: 2rem;
    width: 15%;
`;


export default function CoinList(props) {

  const [term, setTerm] = useState("");
  const handleTerm = (e) => setTerm(e.target.value);

  return (
    <>
    <Input value={term} onChange={handleTerm} placeholder='Search by name or ticker . . .' />
    <H1>Top 250 Cryptocurrencies by Market Cap:</H1>
    <Table>
      <thead>
        <tr>
          <Th>Rank</Th>
          <Th>Name</Th>
          <Th>Ticker</Th>
          <Th>Price</Th>
          <Th>24h Change</Th>
          <Th>24h Volume</Th>
          <Th>Market Cap</Th>
        </tr>
      </thead>
      <tbody>
        {
          props.coinData.filter(val => {
            if(val.name.toLowerCase().includes(term.toLowerCase()) ||
              val.symbol.toLowerCase().includes(term.toLowerCase())){
                return val;
            }
          }).map((coin, key) => 
            <Coin 
              key={key}
              coin={coin}
            />
          )
        }
      </tbody>
    </Table>
    </>
  )
}
