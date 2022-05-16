import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";

//css
const Container = styled.div`
  padding: 0 20px;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 40px;  
`;
const Title = styled.h1`
  color: ${props => props.theme.textColor};
  font-size: 30px;
  text-align: center;
`;
const Loader = styled.div`
  text-align: center;
  display: block;
`;
const PriceContainer = styled.div`
    margin-top: 20px;        
`;
const PriceList = styled.div`  
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.textColor};  
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  &:first-child{
    border-top: 1px solid ${props => props.theme.textColor};  
  }
`;
const Label = styled.div``;
const Value = styled.div``;
const Text = styled.span<{isPositive: boolean}>`
  color: ${props => props.isPositive? `#00b894`: `#ff7675`};
`;
//type
interface RouteParams {
  coinId: string,
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
  //quotes: object;
  quotes : {
    USD: {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }    
  }
}
function PlusMinus(value: number | undefined) {
  if(value) {
    return value > 0;
  }
}

function Price({ coinId }: RouteParams) {
  const {isLoading, data} = useQuery<PriceData>(
    ["tickers", coinId], () => fetchCoinTickers(coinId!), {
      refetchInterval: 5000,
    }
  );  
  return (
    <Container>
      <Title>{data?.symbol} Price</Title>
      {isLoading? <Loader>Price loading...</Loader> : 
        (
          <PriceContainer>
            <PriceList>
              <Label>Percent change (15minutes)</Label>
              <Value>
                <Text isPositive = {PlusMinus(data?.quotes.USD.percent_change_15m) === true }>
                  {data?.quotes.USD.percent_change_15m}%
                </Text>
              </Value>
            </PriceList>
            <PriceList>
              <Label>Percent change (1hour)</Label>
              <Value>
                <Text isPositive = {PlusMinus(data?.quotes.USD.percent_change_1h) === true }>
                  {data?.quotes.USD.percent_change_1h}%
                </Text>
              </Value>
            </PriceList>
            <PriceList>
              <Label>Percent change (1day)</Label>
              <Value>
                <Text isPositive = {PlusMinus(data?.quotes.USD.percent_change_24h) === true }>
                  {data?.quotes.USD.percent_change_24h}%
                </Text>
              </Value>
            </PriceList>
            <PriceList>
              <Label>Percent change (1Week)</Label>
              <Value>
                <Text isPositive = {PlusMinus(data?.quotes.USD.percent_change_7d) === true }>
                  {data?.quotes.USD.percent_change_7d}%
                </Text>
              </Value>
            </PriceList>
            <PriceList>
              <Label>Percent change (1month)</Label>
              <Value>
                <Text isPositive = {PlusMinus(data?.quotes.USD.percent_change_30d) === true }>
                  {data?.quotes.USD.percent_change_30d}%
                </Text>
              </Value>
            </PriceList>
            <PriceList>
              <Label>Percent change (1year)</Label>
              <Value>
                <Text isPositive = {PlusMinus(data?.quotes.USD.percent_change_1y) === true }>
                  {data?.quotes.USD.percent_change_1y}%
                </Text>
              </Value>
            </PriceList>
          </PriceContainer>        
        )
      }
    </Container>    
  );
}

export default Price;