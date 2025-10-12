import { memo } from 'react';
import { SearchBox, Pagination, Button } from '../../index';
import css from './App.module.css';

// ================================================================

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onOpenCreate: () => void;
  searchMaxLength?: number;
}

// ================================================================

function Header({
  searchValue,
  onSearchChange,
  totalPages,
  currentPage,
  onPageChange,
  onOpenCreate,
  searchMaxLength = 50,
}: HeaderProps) {
  return (
    <header className={css.toolbar} aria-label="Notes toolbar">
      <SearchBox
        value={searchValue}
        onChange={onSearchChange}
        maxLength={searchMaxLength}
      />

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}

      <Button text="Create note +" onClick={onOpenCreate} />
    </header>
  );
}

export default memo(Header);
