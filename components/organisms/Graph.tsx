import { useState } from 'react';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import SelectGraphData from '../molecules/SelectGraphData';

import styles from '../../styles/components/organisms/Graph.module.scss';

type PopulationType = {
  totalPopulation: Array<number | string>;
  youthPopulation: Array<number | string>;
  workingAgePopulation: Array<number | string>;
  elderPopulation: Array<number | string>;
};

const Graph = ({ populationList }) => {
  const series: Highcharts.SeriesOptionsType[] = [];
  const categories = [];
  const populationTypeMap: PopulationType = {
    totalPopulation: [0, '総人口推移'],
    youthPopulation: [1, '若年人口'],
    workingAgePopulation: [2, '生産年齢人口'],
    elderlyPopulation: [3, '老年人口'],
  };
  const [populationType, setPopulationType] = useState<string>('totalPopulation');

  populationList.map((population) => {
    const populationDataList = [];
    const populationTypeData = population.data[populationTypeMap[populationType][0]];
    populationTypeData.data.map((populationData) => {
      populationDataList.push(populationData.value);
      categories.push(populationData.year);
      return true;
    });
    series.push({
      type: 'line',
      name: population.prefName,
      data: populationDataList,
    });
    return true;
  });

  const options = {
    title: {
      text: populationTypeMap[populationType][1],
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series: series.length === 0 ? [{ type: 'line', name: '都道府県名', data: [] }] : series,
  };

  return (
    <>
      <SelectGraphData selectData={setPopulationType} />
      <div className={styles['graph']}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default Graph;
