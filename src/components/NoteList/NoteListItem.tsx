import type { Note } from '../../types/note';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';

import { Button } from '../../index';
import css from './NoteList.module.css';

// ================================================================

interface NoteListItemProps {
  item: Note;
}

// ================================================================

function NoteListItem({ item }: NoteListItemProps) {
  const { id, title, content, tag } = item;

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = async () => {
    try {
      await mutateAsync(id);
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  };

  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>

      <div className={css.footer}>
        <span className={css.tag}>{tag}</span>

        <Button
          text={isPending ? 'Deleting…' : 'Delete'}
          variant="delete"
          type="button"
          onClick={handleDelete}
          disabled={isPending}
        />
      </div>
    </li>
  );
}

export default NoteListItem;
