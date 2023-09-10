import styles from '@/styles/components/organisms/Home.module.scss';
import Prefectures from '@/components/organisms/Prefectures';
import Graph from '@/components/organisms/Graph';
import { useState } from 'react';
import { useFetchPrefectureName } from '@/hooks/useFetchPrefectureName';

type PopulationRes = {
  message: string;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: {
        year: number;
        value: number;
      }[];
    }[];
  };
};

type PrefecturesRes = {
  message: string;
  result: {
    prefCode: number;
    prefName: string;
  }[];
};

type Population = {
  prefName: string;
  data: { year: number; value: number }[];
}[];

export default function Home() {
  const [prefectures, setPrefectures] = useState<PrefecturesRes | null>(null);
  const [prefPopulation, setPrefPopulation] = useState<Population>([]);

  useFetchPrefectureName()
    .then((prefectureList) => {
      if (prefectures == null) {
        setPrefectures(prefectureList);
      }
    })
    .catch((error) => {});

  const fetchPopulation = async (prefCode) => {
    try {
      const fetchedPopulationData: Promise<T> = await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode= + ${prefCode}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_APIKEY,
        },
      });
      console.log('This is fetched: ', fetchedPopulationData);

      const jsonPopulation = (await fetchedPopulationData.json()) as PopulationRes;
      console.log('This is jsonPopu: ', jsonPopulation);
      const populationList = jsonPopulation.result;
      console.log('This is populationList: ', populationList);
      return populationList;
    } catch (error) {
      window.alert('データ取得に失敗しました');
    }
    return true;
  };

  const handleCheck = (prefName: string, prefCode: number, check: boolean) => {
    const availPrefPopulation = [...prefPopulation];

    if (check) {
      if (availPrefPopulation.findIndex((value) => value.prefName === prefName) !== -1) return;
      fetchPopulation(prefCode)
        .then((results) => {
          availPrefPopulation.push({
            prefName,
            data: results.data,
          });

          setPrefPopulation(availPrefPopulation);
        })
        .catch((error) => {});
    } else {
      const deleteIndex = availPrefPopulation.findIndex((value) => value.prefName === prefName);
      if (deleteIndex === -1) return;
      availPrefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(availPrefPopulation);
    }
  };

  return (
    <main>
      <h2 className={styles['label']}>都道府県</h2>
      <Prefectures prefectures={prefectures} onChange={handleCheck} />
      <h2 className={styles['label']}>人口推移グラフ</h2>
      <Graph populationList={prefPopulation} />
    </main>
  );
}
