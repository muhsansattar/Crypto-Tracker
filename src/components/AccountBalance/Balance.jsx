import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMoralis } from "react-moralis";
import { Input } from "antd"
import 'antd/dist/antd.css';
import { Select } from 'antd';
import Account from './Account';
import { Link } from 'react-router-dom';
const { Option } = Select;


const Td = styled.td`
    width: 25vh;
`;

const Button = styled.button`
    background-color: rgb(180, 229, 255);
    border: none;
    border-radius: 20px;
    padding: 0.75rem;
    font-size: 1.65rem;
    margin-bottom: 2rem;
    &:hover {
        background-color: rgb(221, 243, 255);
    }
`;

const Table = styled.table`
  margin: 10px auto 20px auto;
  display: inline-block;
  font-size: 1.4rem;
`;

const H1 = styled.h1`
  margin-top: 50px;
  text-align: center;
`;

const Th = styled.th`
`;

const Title = styled.span`
    font-size: 2rem;
    font-wight: 500;
    margin-top; 2vh;
    padding-top; 2vh;
`;

const MainTitle = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  padding-bottom: 4vh;
`;

const Portfolio = styled.div`
    padding: 2vw;
    border-radius: 2rem;
    background-color: rgb(180, 229, 255);
    margin-bottom: 5vh;
`;

const Add = styled.div`
    display: column;
    flex-direction: row;
    width: 60%;
    max-height: 5%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;



export default function Balance({ coins }) {
    const { user, refetchUserData, setUserData } = useMoralis();

    const [balance, setBalance] = useState([]);
    const [coin, setCoin] = useState();
    const [amount, setAmount] = useState();

    const onChange = (value) => {
      setCoin(value);
    };

    const handleAmountChange = (event) => setAmount(event.target.value);

    const calculateTotalBalance = () => {
      let total = 0;
      coins.map(coin => {
        balance.map(asset => {
          if(asset.coin == coin.symbol) {
            total += coin.current_price * asset.amount;
          }
        })
      });
      return numberWithCommas(Math.round(total * 100) / 100);
    }

    const getPriceChange = (change) => {
      let color = change < 0 ? "red" : "green";
      return <span style={{ color: color }}>{Math.round(change * 10) / 10}%</span>
    }

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const addNew = async() => {
      try{
        if(!amount) return alert("Amount must be positive!")
        if(amount <= 0) return alert("Amount must be positive!");
        if(!coin) return alert("Please chose a coin!");
        let aleadySaved = false;

        if(aleadySaved) return alert("Already added please delete it and add it again!")
        let balancesToSet = [];

        if(balance.length>0) {
          balancesToSet = [...balance, {
            coin: coin,
            amount: amount
          }];
        }else{
          balancesToSet = [{
            coin: coin,
            amount: amount
          }];
        } 

        await setUserData({
          balances: balancesToSet
        });
        await refetchUserData();
        getBalances();
        alert("Saved!");
      }catch(err){
        alert(err);
      }
    }

    const deleteAsset = async(coin) => {
      try{
        if(balance.length<= 0) return alert("There is nothing to delete!");

        let newBalances = [];
        balance.map(asset => {
          if(asset.coin != coin) newBalances.push(asset);
        });
        console.log("new balances")
        console.log(newBalances)
        await setUserData({
          balances: newBalances
        });
        await refetchUserData();
        getBalances();
        alert("Deleted!");
      }catch(err){
        alert(err);
      }
    }

    const renderAssests = () => {
      let assetsToRender = [];

      coins.map(coin => {
        balance.map(asset => {
          if(asset.coin == coin.symbol) {
            assetsToRender.push({
              ...coin,
              amount: asset.amount,
            })
          }
        })
      });

      return assetsToRender.map(asset => {
        return(
          <tr>
            <Td>
                <Link to={`/${asset.id}`}>
                  <img src={asset.image} alt="Coin Logo" width={30} height={30} />
                  {asset.name} ({asset.symbol.toUpperCase()})
                </Link>
            </Td>
            <Td>${numberWithCommas(asset.current_price)}</Td>
            <Td>${numberWithCommas(Math.round(asset.current_price * asset.amount * 100) / 100)}</Td>
            <Td>{numberWithCommas(asset.amount)} {asset.symbol.toUpperCase()}</Td>
            <Td>{getPriceChange(asset.price_change_percentage_24h)}</Td>
            <Td>{getPriceChange(asset.ath_change_percentage)}</Td>
            <Td>
              <Button onClick={() => deleteAsset(asset.symbol)}>Delete</Button>  
            </Td>
          </tr>
        )
      })
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

    return (
      <Portfolio>
        <Header>
          <MainTitle>Your Portfolio</MainTitle>
          <Account />
        </Header>
        {balance.length>0 ? (
          <>
            <Title><b>Balance:</b> ${calculateTotalBalance()}</Title><br/>
            <Title><b>Assets:</b></Title>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Your Holding</Th>
                  <Th>Amount</Th>
                  <Th>24h Change</Th>
                  <Th>ATH</Th>
                  <Th>Delete</Th>
                </tr>
              </thead>
              <tbody>
                {renderAssests()}
              </tbody>
            </Table>
          </>
        ):(
          <>
            <p>You don't have any assests yet. Add them below:</p>
          </>
        )}

        <Add>
          <Select
            showSearch
            placeholder="Select crypto"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {coins.map(coin => {
              return(
                <Option value={coin.symbol}>{coin.name}</Option>
              )
            })}
          </Select> 
          <input placeholder='Amount' value={amount} onChange={handleAmountChange} />
          <Button onClick={addNew}>Add</Button>
        </Add>
      </Portfolio>
    );
}