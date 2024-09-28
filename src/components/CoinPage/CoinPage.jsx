import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LineChart } from "recharts";
import { useMoralis } from "react-moralis";

const Box = styled.div`
  text-align: left;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 6vh;
  margin-bottom: 6vh;
`;

const Title = styled.div`
  display: flex;
  felx-direction: row;
`;

const Header = styled.div`
display: flex;
felx-direction: row;
justify-content: space-between;
`;

const Logo = styled.img`
  border-radius: 1rem;
  height: 6rem;
`;

const Name = styled.span`
  margin-left: 1rem;
  font-size: 3.5rem;
  font-weight: 900;
  width: 100%;
`;

const PriceDiv = styled.div`
font-size: 2.5rem;
font-weight: 800;
`;

const Details = styled.div`
  font-size: 1.5rem;
  margin-top: 5vh;
  font-weight: 400;
`;

const numberWithCommas = (x) => {
  if(x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "-"
}

const CoinPage = ({ coin }) => {

  const [balance, setBalance] = useState([]);
  const { user } = useMoralis();

  const getPriceChange = (change) => {
    let color = change < 0 ? "red" : "green";
    return <span style={{ color: color }}>{Math.round(change * 10) / 10}%</span>
  }

  const getDate = (date) => {
    return date.slice(0, 10);
  }

  const getLastuUpdatedAt = (date) => {
    let part1 = date.slice(0, 10);
    let part2 = date.slice(12, 18);
    return `${part2} ${part1}`;
  }

  const renderAsset = () => {
    let _balance;
    
    balance.map(asset => {
      if(asset.coin == coin.symbol) {
        _balance = asset;
      }
    });

    if(_balance) return `${numberWithCommas(_balance.amount)} ${_balance.coin.toUpperCase()} ($${numberWithCommas(Math.round(coin.current_price * _balance.amount * 10) / 10)})`;
    return "You do not HODL this crypto. Add it in you portfolio.";
  }

  const getBalances = () => {
    if(user) {
      let balances = user.get("balances");
      if(balances) {
        setBalance(balances)
      }
    }
  }

  useEffect(() => {
    getBalances();
  }, [user]);


  return(
    <Box>
      <Header>
        <Title>
          <Logo src={coin.image} alt={coin.name}/>
          <Name>{coin.name} ({coin.symbol.toUpperCase()})</Name>
        </Title>
        <PriceDiv>
          <h2>${numberWithCommas(coin.current_price)} {getPriceChange(coin.price_change_percentage_24h)}</h2>
        </PriceDiv>
      </Header>

      <Details>
        {balance ? (
          <h4><b>Your Balance: </b>{renderAsset()}</h4>
        ):null}
        <br/>
        <p><b>ALL Time High: </b> ${numberWithCommas(coin.ath)} {getPriceChange(coin.ath_change_percentage)} ({getDate(coin.ath_date)})</p>
        <p><b>ALL Time Low: </b> ${numberWithCommas(coin.atl)} {getPriceChange(coin.atl_change_percentage)} ({getDate(coin.atl_date)})</p>
        <p><b>Circulating Supply: </b> {numberWithCommas(coin.circulating_supply)} {coin.symbol.toUpperCase()}</p>
        <p><b>Max Supply: </b> {numberWithCommas(coin.max_supply)} {coin.symbol.toUpperCase()}</p>
        <p><b>Market Cap Rank: </b> #{numberWithCommas(coin.market_cap_rank)}</p>
        <p><b>Market Cap: </b> ${numberWithCommas(coin.market_cap)} {getPriceChange(coin.market_cap_change_percentage_24h)}</p>
        <p><b>Fully Diluted Valuation: </b> ${numberWithCommas(coin.fully_diluted_valuation ? coin.fully_diluted_valuation : coin.market_cap)}</p>
        <br/>
        <h4><b>Last Updated At: </b>{getLastuUpdatedAt(coin.last_updated)}</h4>
      </Details>
    </Box>
  )
}

export default CoinPage;

/**
 * EXAMPLE RESPONSE -btc
 -- * ath: 69045
 --   ath_change_percentage: -71.03041
 --   ath_date: "2021-11-10T14:24:11.849Z"
 --   atl: 67.81
--    atl_change_percentage: 29397.53968
  --  atl_date: "2013-07-06T00:00:00.000Z"
  --  circulating_supply: 19080125
  --  current_price: 20003
    fully_diluted_valuation: 420041720301
    high_24h: 21195
 --   id: "bitcoin"
--    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
    last_updated: "2022-06-29T09:03:07.901Z"
    low_24h: 19954.04
  --  market_cap: 381640406122
   -- market_cap_change_24h: -20997937295.76996
 --   market_cap_change_percentage_24h: -5.21509
   -- market_cap_rank: 1
 --   max_supply: 21000000
--    name: "Bitcoin"
  --  price_change_24h: -1117.7485701187616
  --  price_change_percentage_24h: -5.29226
  --  roi: null
--   symbol: "btc"
  --  total_supply: 21000000
    total_volume: 19500971627
 */
