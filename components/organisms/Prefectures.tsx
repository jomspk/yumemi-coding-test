import styles from "../../styles/components/organisms/Prefecture.module.scss";
import { useFetchPrefectureName } from "@/hooks/useFetchPrefectureName";
import { useState, useEffect } from "react";
import { idText } from "typescript";

const Prefectures = ({ prefectures, onChange }) => {
  if (prefectures == null) {
    return <p>loading...</p>;
  }
  return (
    <div className={styles["check-box"]}>
      {prefectures.map((prefecture) => {
        return (
          <div className={styles["check-box__element"]} key={prefecture.prefName}>
            <input type="checkbox" name="Prefecture name" id={"checkbox" + prefecture.prefCode} onChange={(event) => onChange(prefecture.prefName, prefecture.prefCode, event.target.checked)} />
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
