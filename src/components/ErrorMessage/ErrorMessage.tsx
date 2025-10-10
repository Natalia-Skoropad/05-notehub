import css from './ErrorMessage.module.css';

// ===============================================================

interface Props {
  message?: string;
}

// ===============================================================

function ErrorMessage({ message = 'Failed to load notes' }: Props) {
  return (
    <p className={css.text} role="alert">
      {message}
    </p>
  );
}

export default ErrorMessage;
