import { useState, useEffect } from 'react';
import API from '../components/API/API'; 

const useLoad = (endpoint) => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = async () => {
    setIsLoading(true); 
    const response = await API.get(endpoint);
    setIsLoading(false); // Ensure this runs before setting records to avoid race conditions
    if (response.isSuccess) {
      setRecords(response.result);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return [records, setRecords, isLoading, loadRecords];
};

export default useLoad;