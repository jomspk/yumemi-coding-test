import styles from "../styles/components/Prefecture.module.scss";
import { useFetchPrefectureName } from "@/hooks/useFetchPrefectureName";
import { useState, useEffect } from "react";
import { idText } from "typescript";

const Prefectures = () => {
  const [prefecturesName, setPrefecturesName] = useState(null);
  useFetchPrefectureName().then((prefectureList) => {
    if (prefecturesName == null) {
      setPrefecturesName(prefectureList);
    }
  });

  if (prefecturesName == null) {
    return <p>loading...</p>;
  }
  return (
    <div className={styles["check-box"]}>
      {prefecturesName.map((prefecture) => {
        return (
          <div className={styles["check-box__element"]} key={prefecture.prefName}>
            <input type="checkbox" name="Prefecture name" id={"checkbox" + prefecture.prefCode} />
            <label className={styles["check-box__element--pointer"]} htmlFor={"checkbox" + prefecture.prefCode}>
              {" " + prefecture.prefName}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Prefectures;
