import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = (key, initialState) => {
  const [record, setRecord] = useState(initialState);

  const loadRecord = async () => {
    try {
      const storedRecord = await AsyncStorage.getItem(key);
      if (storedRecord !== null) {
        setRecord(JSON.parse(storedRecord));
      }
    } catch (error) {
      console.log(`Error loading ${key}:`, error);
    }
  };

  const saveRecord = async (newRecord) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newRecord));
      setRecord(newRecord);
    } catch (error) {
      console.log(`Error saving ${key}:`, error);
    }
  };

  useEffect(() => {
    loadRecord();
  }, []);

  return [record, setRecord, saveRecord];
};

export default useStore;