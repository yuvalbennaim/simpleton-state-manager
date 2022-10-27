import React, { useEffect, useState, useRef } from 'react';
import useDataStore from './useStateStore';

export default function useStateToStoreBinding(modelName, defaultValue, callback) {
  const store = useDataStore();
  const initialValue = store.getModel(modelName) || defaultValue;
  const [localValue, setLocalValue] = useState(initialValue);

  const setLocalValueWrapper = (value) => {  
    store.setModel(modelName, value); 
  };

  useEffect(() => {
    const key = store.subscribe(modelName, (model) => {
      console.log(modelName + " changed", model);
      setLocalValue(model);

      if(callback) {
        callback(model);
      }
    }); 

    return () => { //dismounting component
      store.unsubscribe(modelName, key);
    }
  }, []);

  return [localValue, setLocalValueWrapper];
}