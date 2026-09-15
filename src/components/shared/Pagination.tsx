'use client';
import { useRouter } from 'next/navigation';

import ReactPaginate from 'react-paginate';

import { cn } from '@/lib/utils';

export const updateSearchParams = (key: string, value: string) => {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(key, value);

  const newPathname = `${location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
type PaginationProps = {
  totalCount: number;
  pageSize: string;
  pageNumber: string | number;
};

const linkStyles = 'size-10 flex items-center justify-center  bg-transparent';

const Pagination = ({ totalCount, pageSize, pageNumber }: PaginationProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / parseInt(pageSize));
  if (totalPages <= 1) return null;
  return (
    <>
      <ReactPaginate
        previousLabel='Previous'
        nextLabel='Next'
        breakLabel='...'
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        containerClassName='flex p-4 mx-auto items-center overflow-x-auto max-sm:max-w-xs max-w-fit gap-6'
        previousLinkClassName={cn(
          linkStyles,
          'w-fit text-secondary-500 underline bg-transparent',
        )}
        nextLinkClassName={cn(
          linkStyles,
          'w-fit text-secondary-500 underline bg-transparent',
        )}
        pageLinkClassName={linkStyles}
        disabledLinkClassName='cursor-default !bg-transparent text-grayish-900'
        activeLinkClassName=' rounded-xl !bg-secondary-500 !text-white'
        breakClassName='px-2 py-4'
        initialPage={parseInt(pageNumber as string) - 1}
        onPageChange={({ selected }: { selected: number }) => {
          const newPathname = updateSearchParams(
            'pageNumber',
            `${selected ? selected + 1 : 1}`,
          );

          router.push(newPathname, { scroll: true });
        }}
      />
    </>
  );
};

export default Pagination;
