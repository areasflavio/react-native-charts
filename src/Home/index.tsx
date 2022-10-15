import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';

import { EXPENSES } from '../utils/expenses';

import { Card, CardProps } from '../components/Card';
import { Header, MonthsProps } from '../components/Header';

import { Chart, Container } from './styles';

export function Home() {
  const [month, setMonth] = useState<MonthsProps>('Janeiro');
  const [data, setData] = useState<CardProps[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setData(EXPENSES[month]);
  }, [month]);

  const handleSelectCardOnPress = (id: string) => {
    setSelected((prevState) => (prevState === id ? '' : id));
  };

  return (
    <Container>
      <Header onValueChange={setMonth} selectedValue={month} />

      <Chart>
        <VictoryPie
          data={data}
          x="label"
          y="value"
          colorScale={data.map((item) => item.color)}
          innerRadius={80}
          padAngle={3}
          animate={{
            easing: 'bounce',
          }}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              flyoutStyle={{
                stroke: 0,
                fill: ({ datum }) => datum.color,
              }}
            />
          }
          style={{
            labels: {
              fill: '#ffffff',
            },
            data: {
              fillOpacity: ({ datum }) =>
                datum.id === selected || selected === '' ? 1 : 0.5,
              stroke: ({ datum }) =>
                datum.id === selected ? datum.color : 'none',
              strokeOpacity: 0.5,
              strokeWidth: 10,
            },
          }}
        />
      </Chart>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleSelectCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
