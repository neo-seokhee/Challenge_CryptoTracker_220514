import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';
import { isDarkAtom } from '../atoms';
import { useRecoilValue } from 'recoil';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        'Loading Chart'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              }))!,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparant',
            },
            grid: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: {
                style: { colors: isDark ? '#FFFFFF' : 'black' },
              },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              show: true,
              labels: {
                style: { colors: isDark ? '#FFFFFF' : 'black' },
                formatter: (val) => {
                  return `$${val
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
