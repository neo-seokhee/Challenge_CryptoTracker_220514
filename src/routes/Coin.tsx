import styled from 'styled-components';
import {
  Routes,
  Route,
  useLocation,
  useParams,
  Link,
  useMatch,
} from 'react-router-dom';
import Chart from './Chart';
import Price from './Price';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from './api';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderColumn = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Back = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.accentColor};
  margin: 35px 0 0 10px;
  span {
  }
`;

const HeaderWrapper = styled.div`
  width: 70%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderColumnRest = styled.div`
  width: 15%;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const Title = styled.h1`
  font-size: 38px;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 15px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 20px 30px;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  padding: 0px 20px;
  line-height: 1.4em;
  max-height: 10vh;
  overflow-y: scroll;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 0px;
  border-radius: 10px;
  display: block;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    transition: color 0.2s ease-in-out;
  }
`;

const Text = styled.span`
  color: ${(props) => props.theme.textColor};
`;

interface LocationState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as LocationState;
  const priceMatch = useMatch(`${process.env.PUBLIC_URL}/:coinId/price`);
  const chartMatch = useMatch(`${process.env.PUBLIC_URL}/:coinId/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoading; //info 나 ticker가 로딩중이면 True

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     // Info Data
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     // Price Data
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading' : infoData?.name}
        </title>
      </Helmet>
      {/* Header */}
      <Header>
        <HeaderColumn>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <Back>
              &larr; <span>Home</span>
            </Back>
          </Link>
        </HeaderColumn>
        <HeaderWrapper>
          <Img src={`https://cryptocurrencyliveprices.com/img/${coinId}.png`} />
          <Title>
            {state?.name ? state.name : loading ? 'Loading' : infoData?.name}
          </Title>
        </HeaderWrapper>
        <HeaderColumnRest></HeaderColumnRest>
      </Header>

      {/* Coins List */}
      {loading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <Text>Rank:</Text>
              <Text>{infoData?.rank}</Text>
            </OverviewItem>
            <OverviewItem>
              <Text>Symbol:</Text>
              <Text>{infoData?.symbol}</Text>
            </OverviewItem>
            <OverviewItem>
              <Text>Price:</Text>
              <Text>
                $
                {tickersData?.quotes.USD.price
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <Text>Total Supply:</Text>
              <Text>
                {tickersData?.total_supply.toLocaleString('ko-KR')}{' '}
                {infoData?.symbol}
              </Text>
            </OverviewItem>
            <OverviewItem>
              <Text>Max Supply:</Text>
              <Text>
                {tickersData?.max_supply.toLocaleString('ko-KR')}{' '}
                {infoData?.symbol}
              </Text>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/chart`}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`${process.env.PUBLIC_URL}/${coinId}/price`}>
                Price
              </Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId as string} />} />
            <Route path="price" element={<Price coinId={coinId as string} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
