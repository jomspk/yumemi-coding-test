import styles from '@/styles/components/organisms/Home.module.scss';
import Prefectures from '@/components/organisms/Prefectures';
import Graph from '@/components/organisms/Graph';
import { useState } from 'react';
import { PopulationRes, Population, Prefecture } from '@/type/Types';
import useFetchPrefectureName from '@/hooks/useFetchPrefectureName';

export default function Home() {
  const [prefectures, setPrefectures] = useState<Prefecture[] | null>(null);
  const [prefPopulation, setPrefPopulation] = useState<Population[]>([]);

  useFetchPrefectureName()
    .then((prefectureList) => {
      if (prefectures == null) {
        setPrefectures(prefectureList);
      }
    })
    .catch(() => {
      window.alert('データ取得に失敗しました');
    });

  const fetchPopulation = async (prefCode: number) => {
    try {
      const fetchedPopulationData = await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode= + ${prefCode}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_APIKEY || '',
        },
      });

      const jsonPopulation = (await fetchedPopulationData.json()) as PopulationRes;
      const populationList = jsonPopulation.result;
      return populationList;
    } catch (error) {
      window.alert('データ取得に失敗しました');
      return null;
    }
  };

  const handleCheck = (prefName: string, prefCode: number, check: boolean) => {
    const availPrefPopulation = [...prefPopulation];

    if (check) {
      if (availPrefPopulation.findIndex((value) => value.prefName === prefName) !== -1) return;
      fetchPopulation(prefCode)
        .then((results) => {
          if (results == null) throw new Error('Failure to aquire data');
          availPrefPopulation.push({
            prefName,
            data: results.data,
          });

          setPrefPopulation(availPrefPopulation);
        })
        .catch(() => {
          window.alert('データ取得に失敗しました');
        });
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
