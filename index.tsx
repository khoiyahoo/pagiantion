//data get from APIs

const [itemOffset, setItemOffset] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10 as const;
const endOffset = itemOffset + itemsPerPage;
const currentItems = useMemo(() => {
  return data.slice(itemOffset, endOffset);
}, [itemOffset, endOffset, data]);

const handlePageClick = (page: number) => {
  const newOffset = ((page - 1) * itemsPerPage) % data.length;
  setItemOffset(newOffset);
  setCurrentPage(page);
};

<Pagination
  onPageChange={handlePageClick}
  totalCount={data.length}
  pageSize={itemsPerPage}
  currentPage={currentPage}
  siblingCount={4}
/>;
