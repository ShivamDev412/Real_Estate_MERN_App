import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
interface CustomPaginationProps {
  pageNo: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  pageNo,
  totalPageCount,
  onPageChange,
}) => {
  const pageNumbers = [];
  const displayLimit = 9;

  for (let i = 1; i <= totalPageCount; i++) {
    if (
      i === 1 ||
      i === totalPageCount ||
      i === pageNo ||
      (i >= pageNo - Math.floor(displayLimit / 2) &&
        i <= pageNo + Math.floor(displayLimit / 2))
    ) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
      pageNumbers.push("...");
    }
  }

  const handlePageChange = (page: any) => {
    if (page !== "...") {
      onPageChange(page);
    }
  };

  return (
    <ul className="flex space-x-2 items-center">
      {pageNo > 1 && (
        <li
          className="cursor-pointer"
          onClick={() => handlePageChange(pageNo - 1)}
        >
          <IoIosArrowBack />
        </li>
      )}

      {pageNumbers.map((page, index) => (
        <li
          key={index}
          className={`cursor-pointer p-2 rounded-lg w-8 h-8 flex items-center justify-center ${
            page === pageNo
              ? "text-blue-500 font-bold bg-blue-100 shadow-md"
              : "hover:bg-gray-200"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </li>
      ))}

      {pageNo < totalPageCount && (
        <li
          className="cursor-pointer"
          onClick={() => handlePageChange(pageNo + 1)}
        >
          <IoIosArrowForward />
        </li>
      )}
    </ul>
  );
};

export default CustomPagination;
