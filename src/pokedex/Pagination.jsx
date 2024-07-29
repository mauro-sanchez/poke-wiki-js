import { LIMIT } from "../functions/common";
import ResponsivePagination from "react-responsive-pagination";
import PropTypes from "prop-types";

export const Pagination = ({ currentOffset, totalCount, handlePageClick }) => {
  const totalPages = Math.ceil(totalCount / LIMIT);
  const currentPage = currentOffset / LIMIT + 1;
  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={(page) => handlePageClick(page)}
      className="pagination"
      previousClassName="previous"
      previousLabel="&laquo;"
      ariaPreviousLabel=""
      nextClassName="next"
      nextLabel="&raquo;"
      ariaNextLabel="next"
    />
  );
};

Pagination.propTypes = {
  currentOffset: PropTypes.number,
  totalCount: PropTypes.number,
  handlePageClick: PropTypes.func,
};

export default Pagination;
