import type { Note } from '../../types/note';
import NoteListItem from './NoteListItem';
import css from './NoteList.module.css';

// ================================================================

interface NoteListProps {
  items: Note[];
}

// ================================================================

function NoteList({ items }: NoteListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={css.list}>
      {items.map(note => (
        <NoteListItem key={note.id} item={note} />
      ))}
    </ul>
  );
}

export default NoteList;
