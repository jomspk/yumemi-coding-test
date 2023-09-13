import styles from '../../styles/components/molecules/SelectGraphData.module.scss';

type Props = {
  selectData: (populationtype: string) => void;
};
const SelectGraphData = (props: Props) => {
  const { selectData } = props;
  return (
    <div>
      <select className={styles['select-box']} onChange={(event) => selectData(event.target.value)}>
        <option value="totalPopulation">総人口</option>
        <option value="youthPopulation">若年人口</option>
        <option value="workingAgePopulation">生産年齢人口</option>
        <option value="elderlyPopulation">老年人口</option>
      </select>
    </div>
  );
};

export default SelectGraphData;
