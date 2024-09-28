import React, { Component } from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Td = styled.td`
    width: 25vh;
`;
const Button = styled.button`
    width: 100%;
    height: 2.75rem;
    background-color: rgb(221, 243, 255);
    border: none;
    font-size: 1.25rem;
    &:hover {
        background-color: rgb(180, 229, 255);
    }
`;

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Coin({ coin }) {

    const getPriceChange = () => {
        let color = coin.price_change_percentage_24h < 0 ? "red" : "green";
        return <span style={{ color: color }}>{Math.round(coin.price_change_percentage_24h * 10) / 10}%</span>
    }

    return (
        <tr>
            <Td>#{coin.market_cap_rank}</Td>
            <Td>
                <Link to={`/${coin.id}`}>
                    <img src={coin.image} alt="Coin Logo" width={30} height={30} />
                    {coin.name}
                </Link>
            </Td>
            <Td>{coin.symbol.toUpperCase()}</Td>
            <Td>${numberWithCommas(coin.current_price)}</Td>
            <Td>{getPriceChange()}</Td>
            <Td>${numberWithCommas(coin.total_volume)}</Td>
            <Td>${numberWithCommas(coin.market_cap)}</Td>
        </tr>
    )
}


