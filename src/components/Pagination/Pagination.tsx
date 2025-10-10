import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

// ================================================================

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// ================================================================

function Pagination({ pageCount, currentPage, onPageChange }: Props) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      nextLabel=">"
      previousLabel="<"
      breakLabel="…"
    />
  );
}

export default Pagination;
