import { useState, useRef, useEffect, ChangeEvent } from 'react';

const useDebouncedState = (initialState?: number | undefined) => {
  const [value, setValue] = useState<number | undefined>(initialState);
  const [debouncedValue, setDebouncedValue] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setDebouncedValue(newValue);
    }, 2000);
  };

  return [value, debouncedValue, handleChange] as const;
};

export default useDebouncedState;
