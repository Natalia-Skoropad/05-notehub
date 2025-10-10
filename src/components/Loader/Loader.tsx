import css from './Loader.module.css';

//===============================================================

interface Props {
  label?: string;
  size?: number;
}

//===============================================================

function Loader({ label = 'Loading…', size = 30 }: Props) {
  return (
    <div className={css.wrap} role="status" aria-live="polite" aria-busy="true">
      <span
        className={css.spinner}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}

export default Loader;
