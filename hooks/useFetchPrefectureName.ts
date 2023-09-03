export const useFetchPrefectureName = async () => {
  try {
    const res = await fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_APIKEY,
      },
    });

    const data = await res.json();
    const prefectures = data.result;

    return prefectures;
    // return {
    //   props: {
    //     prefectures,
    //   },
    // };
  } catch (error) {
    return {
      props: {
        prefectures: [],
        error: JSON.stringify(error),
      },
    };
  }
};
