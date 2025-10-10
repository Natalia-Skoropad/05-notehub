import { useId, type ChangeEvent } from 'react';
import css from './SearchBox.module.css';

// ================================================================

export interface SearchBoxProps {
  value: string;
  onChange: (newValue: string) => void;
  maxLength?: number;
}

// ================================================================

export default function SearchBox({
  value,
  onChange,
  maxLength = 50,
}: SearchBoxProps) {
  const uid = useId();
  const inputId = `search-${uid}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value.slice(0, maxLength);
    onChange(next);
  };

  return (
    <div className={css.wrap}>
      <label htmlFor={inputId} className="visually-hidden">
        Search
      </label>
      <input
        id={inputId}
        className={css.input}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search notes"
        maxLength={maxLength}
      />
    </div>
  );
}
