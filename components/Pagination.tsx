import { usePagination, DOTS } from '../hooks/usePagination';

// Conditionally joining class names
const classNames = (...classes: string[] | undefined[]): string => {
  return classes.filter((c) => c).join(' ');
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classNames('flex list-none', `${className}`)}>
      <li
        className={classNames(
          'pagination-item',
          currentPage === 1 && 'pointer-events-none cursor-default hover:bg-transparent'
        )}
        onClick={onPrevious}
      >
        <div
          className={classNames(
            'before:relative inline-block w-2 h-2 border-t-[0.12em] border-[rgba(0,0,0,0.87)] border-r-[0.12em] transform -rotate-[135deg] translate-x-[-50%]',
            currentPage === 1 &&
              'before:br-[rgba(0,0,0,0.43)] border-[0.12em] before:bt-[rgba(0,0,0,0.43)]'
          )}
        />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={`dots-${index}`}
              className="pagination-item hover:bg-transparent hover:cursor-default"
            >
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={pageNumber}
            className={classNames(
              'pagination-item',
              pageNumber === currentPage && 'bg-[rgba(0,0,0,0.08)]'
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classNames(
          'pagination-item',
          currentPage === lastPage && 'pointer-events-none cursor-default hover:bg-transparent'
        )}
        onClick={onNext}
      >
        <div
          className={classNames(
            'before:relative inline-block w-2 h-2 border-t-[0.12em] border-[rgba(0,0,0,0.87)] border-r-[0.12em] transform rotate-45',
            currentPage === lastPage &&
              'before:br-[rgba(0,0,0,0.43)] border-[0.12em] before:bt-[rgba(0,0,0,0.43)]'
          )}
        />
      </li>
    </ul>
  );
};

export default Pagination;
