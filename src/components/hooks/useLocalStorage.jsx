import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  // const [value,setValue]=useState(JSON.parse(localStorage.getItem(key))||null); //1
  //The following does the same thing as Line 1. But it also handles the case of initialValue being a function

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) {
      JSON.parse(jsonValue);
    } else {
      if (typeof initialValue == 'function') {
        initialValue();
      } else {
        return initialValue;
      }
    }
  });

  //Every time the value or key changes,we want to update the localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

//useState takes an initialValue or a function that would return a value which would then be an initialValue. Makes sense.
