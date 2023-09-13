import { PrefecturesRes } from '@/type/Types';

const useFetchPrefectureName = async () => {
  try {
    const res = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_APIKEY || '',
      },
    });

    const data = (await res.json()) as PrefecturesRes;
    const prefectures = data.result;

    return prefectures;
  } catch (error) {
    return null;
  }
};

export default useFetchPrefectureName;
