import React from "react";
import { LIMIT } from "../functions/common";
import ResponsivePagination from "react-responsive-pagination";

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

export default Pagination;
