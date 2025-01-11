import { useEffect, useState } from 'react';

export const useGetCallingCodeTransformer = data => {
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const modifiedData = data?.map(item => ({
        label: `${item?.name} ${item?.calling_code}`,
        value: item?.id,
      }));

      setTransformedData(modifiedData);
    }
  }, [data]);

  return transformedData;
};

export const test = '';
