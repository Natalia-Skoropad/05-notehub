import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchNotes } from '../../services/noteService';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';

import {
  NoteList,
  Button,
  Loader,
  ErrorMessage,
  Pagination,
  Modal,
  SearchBox,
} from '../../index';

import css from './App.module.css';

// ================================================================

const PER_PAGE = 12;

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    input: notesSearchInput,
    query: search,
    onChange: handleNotesSearch,
  } = useDebouncedSearch({ delay: 1000, onDebounced: () => setPage(1) });

  const normalizedSearch = search.trim().length >= 2 ? search.trim() : '';

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['notes', page, PER_PAGE, normalizedSearch],
    queryFn: () =>
      fetchNotes({ page, perPage: PER_PAGE, search: normalizedSearch }),
    placeholderData: keepPreviousData,
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const errMsg = error instanceof Error ? error.message : undefined;

  return (
    <div className={css.app}>
      <header className={css.toolbar} aria-label="Notes toolbar">
        <SearchBox
          value={notesSearchInput}
          onChange={handleNotesSearch}
          maxLength={50}
        />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Button text="Create note +" onClick={() => setIsModalOpen(true)} />
      </header>

      {(isLoading || isFetching) && <Loader label="Loading notes…" />}
      {isError && <ErrorMessage message={errMsg} />}

      {items.length > 0 && <NoteList items={items} />}

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
