import React, {useState, useEffect} from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
//import { v4 as uuidv4 } from 'uuid'; 
import Header from './components/Header/Header';
import styled from 'styled-components';
import axios from "axios";
import { HashRouter, Routes, Route } from "react-router-dom";
import CoinPage from './components/CoinPage/CoinPage';
import Missing from './components/Missing/Missing';

const solcjs = require('solc-js')


const Div = styled.div`
  text-align: center;
  background-color: rgb(221, 243, 255);
  min-height: 100vh;
`;


const COIN_COUNT = 300;
const formatPrice = (price) => Number((price).toFixed(3));

function App() {
  const [balance, setBalance] = useState(20000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);


  const getCoins = async() => {
    try{
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false");
      console.log(response.data)
      setCoinData(response.data);
    }catch(err){
      alert(err);
    }
  }

  useEffect(() => {
    if(coinData.length == 0) getCoins();
  }, []);


  /*const handleRefresh = async(coinId) => {
    const coin = await axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
    const newCoinData = coinData.map((values) => {
      let newValues = { ...values };
      if (coinId === values.key) {
          newValues.price = formatPrice(coin.data.quotes.USD.price);
      }
      return newValues;
    });
    setCoinData(newCoinData)
  }*/

  const toggleBalance = () => {
    setShowBalance(oldValue => !oldValue);
  }


  return (
    <HashRouter>
      <Div>
        <Header />
        <Routes>
          <Route path='*' element={<Missing />} />
          <Route path='/' element={<CoinList coinData={coinData} showBalance={showBalance} />} />
          <Route path='/top' element={<CoinList coinData={coinData} showBalance={showBalance} />} />
          <Route path='/portfolio' element={<AccountBalance coins={coinData} amount={balance} showBalance={showBalance} toggleBalance={toggleBalance} />} />
          {coinData.map(coin => {
            return(
              <Route key={coin.id} path={coin.id} element={<CoinPage coin={coin} balance={null} />} />
            )
          })}
        </Routes>        
      </Div>
    </HashRouter>
  );
}

export default App;
