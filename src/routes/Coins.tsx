import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from './api';
import { Helmet } from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';
import { FontBox } from '../styles';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Toggle = styled.button`
  margin: 0 0 20px 0;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.accentColor};
  color: #192a56;
  border: none;
  border-radius: 8px;
  transition: 0.2s ease-in-out;
  &:active {
    transform: scale(0.96);
    transition: 0.05s ease-in-out;
  }
  &:hover {
    font-size: 14px;
  }
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: black;
  margin-bottom: 12px;
  padding: 15px;
  border-radius: 15px;
  a {
    padding: 10px;
    transition: color 0.2s ease-in-out;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: true;
  type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  // Fetch by useState & useEffect
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {

  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Crypto Board</title>
      </Helmet>
      {/* Header */}
      <Header>
        <Title>
          <FontBox>
            <h1>Crypto Board</h1>
          </FontBox>
        </Title>
        <Toggle onClick={toggleDarkAom}>Change Mode</Toggle>
      </Header>

      {/* Coins List */}
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 50).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`${process.env.PUBLIC_URL}/${coin.id}/chart`}
                state={{ name: coin.name }}
              >
                <CoinWrapper>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  [{coin.symbol}] : {coin.name} &rarr;{' '}
                </CoinWrapper>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
