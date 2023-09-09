import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/components/organisms/Home.module.scss";
import Prefectures from "@/components/organisms/Prefectures";
import Graph from "@/components/organisms/Graph";
import { useState, useEffect } from "react";
import { useFetchPrefectureName } from "@/hooks/useFetchPrefectureName";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [prefectures, setPrefectures] = useState(null);
  const [prefPopulation, setPrefPopulation] = useState([]);

  useFetchPrefectureName().then((prefectureList) => {
    if (prefectures == null) {
      setPrefectures(prefectureList);
    }
  });

  const fetchPopulation = async (prefCode) => {
    try {
      const fetchedPopulationData = await fetch("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + prefCode, {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_APIKEY,
        },
      });

      const jsonPopulation = await fetchedPopulationData.json();
      const populationList = jsonPopulation.result;
      return populationList;
    } catch (error) {
      window.alert("データ取得に失敗しました");
    }
  };

  const handleCheck = (prefName, prefCode, check) => {
    let availPrefPopulation = [...prefPopulation];

    if (check) {
      if (availPrefPopulation.findIndex((value) => value.prefName === prefName) !== -1) return;
      fetchPopulation(prefCode)
        .then((results) => {
          availPrefPopulation.push({
            prefName: prefName,
            data: results.data,
          });

          setPrefPopulation(availPrefPopulation);
        })
        .catch((error) => {
          return;
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
      <h2 className={styles["label"]}>都道府県</h2>
      <Prefectures prefectures={prefectures} onChange={handleCheck} />
      <h2 className={styles["label"]}>人口推移グラフ</h2>
      <Graph populationList={prefPopulation} />
    </main>
  );
}
