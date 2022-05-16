import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinToday } from './api';

// Interfaces

interface PriceProps {
  coinId: string;
}

interface IToday {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

// Components

const PriceWrapper = styled.div`
  width: 100%;
`;

const PriceList = styled.ol``;

const PriceUnit = styled.li``;

const PriceItem = styled.div``;

function Price({ coinId }: PriceProps) {
  const { isLoading, data: todayData } = useQuery<IToday>(
    ['today', coinId],
    () => fetchCoinToday(coinId)
  );

  return (
    <div>
      {isLoading ? (
        'Loading Price'
      ) : (
        <PriceWrapper>
          <PriceList>
            <PriceUnit>
              <PriceItem>
                {todayData?.market_cap}
                <span>{todayData?.close}</span>
                <span>{todayData?.high}</span>
                <span>{todayData?.market_cap}</span>
              </PriceItem>
            </PriceUnit>
            <PriceUnit>
              <PriceItem>A</PriceItem>
            </PriceUnit>
            <PriceUnit>
              <PriceItem>A</PriceItem>
            </PriceUnit>
            <PriceUnit>
              <PriceItem>A</PriceItem>
            </PriceUnit>
            <PriceUnit>
              <PriceItem>A</PriceItem>
            </PriceUnit>
          </PriceList>
        </PriceWrapper>
      )}
    </div>
  );
}

export default Price;
