import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import styles from "../styles/components/Graph.module.scss";

const Graph = ({ populationList }) => {
  let series = [];
  let categories = [];

  for (let population of populationList) {
    let populationDataList = [];

    for (let populationData of population.data) {
      populationDataList.push(populationData.value);
      categories.push(populationData.year);
    }

    series.push({
      type: "line",
      name: population.prefName,
      data: populationDataList,
    });
  }
  const options = {
    title: {
      text: "総人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series: series.length === 0 ? [{ type: "line", name: "都道府県名", data: [] }] : series,
  };

  return (
    <div className={styles["graph"]}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
