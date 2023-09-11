import { useState } from 'react';
import { PopulationType, Population, PopulationTypeData, PopulationArrayData } from '@/type/Types';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import SelectGraphData from '../molecules/SelectGraphData';

import styles from '../../styles/components/organisms/Graph.module.scss';

type Props = {
  populationList: Population;
};

const Graph = (props: Props) => {
  const { populationList } = props;

  const series: Highcharts.SeriesOptionsType[] = [];
  const categories = [];
  const populationTypeMap: PopulationType = {
    totalPopulation: [0, '総人口推移'],
    youthPopulation: [1, '若年人口'],
    workingAgePopulation: [2, '生産年齢人口'],
    elderlyPopulation: [3, '老年人口'],
  };

  const [populationType, setPopulationType] = useState<string>('totalPopulation');
  const typeArray = populationTypeMap[populationType] as Array<number | string>;

  populationList.map((population: Population) => {
    const populationDataList = [];
    const accessData = typeArray[0] as number;
    const populationArrayData = population.data as PopulationArrayData[];
    const popuTypeData: PopulationTypeData = populationArrayData[accessData];
    popuTypeData.data.map((populationData) => {
      populationDataList.push(populationData.value);
      categories.push(populationData.year);
      return true;
    });
    series.push({
      type: 'line',
      name: population.prefName as string,
      data: populationDataList,
    });
    return true;
  });

  const options = {
    title: {
      text: typeArray[1],
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories,
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
