import React, { useEffect, useState } from 'react';
import useDataStore from './useStateStore';

export default function useStateToStoreBinding(modelName, identifier, defaultValue, callback) {
  const store = useDataStore();
  const initialValue = store.getModel(modelName) || defaultValue;
  const [localValue, setLocalValue] = useState(initialValue);

  useEffect(() => {
    store.subscribe(modelName, identifier, (model) => {
      console.log("modelName changed", model);
      setLocalValue(model);

      if(callback) {
        callback(model);
      }
    });
  });

  return [localValue, setLocalValue];
}
