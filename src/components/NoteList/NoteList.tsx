import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';
import { Button } from '../../index';

import css from './NoteList.module.css';

// ================================================================

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    onSettled: () => setPendingId(null),
  });

  const handleDelete = async (id: string) => {
    try {
      setPendingId(id);
      await mutateAsync(id);
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  };

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Button
              text={pendingId === id ? 'Deleting…' : 'Delete'}
              variant="delete"
              type="button"
              onClick={() => handleDelete(id)}
              disabled={pendingId === id || isPending}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
