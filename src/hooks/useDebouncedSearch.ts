import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

//===============================================================

type Options = {
  delay?: number;
  onDebounced?: (value: string) => void;
};

//===============================================================

export function useDebouncedSearch({ delay = 300, onDebounced }: Options = {}) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');

  const debounced = useDebouncedCallback((v: string) => {
    setQuery(v);
    onDebounced?.(v);
  }, delay);

  const onChange = (v: string) => {
    setInput(v);
    debounced(v.trim());
  };

  return { input, query, onChange, setInput, setQuery };
}
