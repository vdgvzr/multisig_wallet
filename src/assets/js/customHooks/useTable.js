import { useState, useEffect } from "react";

const calculateRange = (data, rowsPerPage) => {
  if (data !== undefined) {
    const range = [];
    const length = Math.ceil(data?.length / rowsPerPage);

    for (let i = 1; i <= length; i++) {
      range.push(i);
    }

    return range;
  }
};

const sliceData = (data, page, rowsPerPage) => {
  if (data !== undefined) {
    return data?.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }
};

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    if (data !== undefined) {
      const range = calculateRange(data, rowsPerPage);
      setTableRange([...range]);

      const slice = sliceData(data, page, rowsPerPage);
      setSlice([...slice]);
    }
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
};

export default useTable;
