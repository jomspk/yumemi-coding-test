export type PopulationRes = {
  message: string;
  result: {
    boundaryYear: number;
    data: PopulationTypeData[];
  };
};

export type PopulationTypeData = {
  label: string;
  data: PopulationArrayData[];
};

export type PopulationArrayData = {
  year: number;
  value: number;
};

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesRes = {
  message: string;
  result: Prefecture[];
};

export type Population = {
  prefName: string;
  data: { year: number; value: number }[];
}[];

export type PopulationType = {
  totalPopulation: Array<number | string>;
  youthPopulation: Array<number | string>;
  workingAgePopulation: Array<number | string>;
  elderPopulation: Array<number | string>;
};
