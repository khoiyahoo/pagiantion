import type { FC } from "react";
import classnames from "classnames";
import usePagination from "@src/hooks/usePagination";
import { useTranslation } from "next-i18next";

interface Props {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination: FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = "",
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const { t } = useTranslation("home");

  // If there are less than 2 times in pagination range we shall not render the component
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
  const lastPageNumber = Math.ceil(totalCount / pageSize);

  const baseStyles = classnames(
    "px-[9px] py-[7px] border border-[#6185cb] flex justify-center items-center font-inter text-[0.813rem] text-[#6185cb] cursor-pointer mx-[5px]",
    "hover:bg-[#6185cb] hover:text-white"
  );
  return (
    <ul
      className={classnames("flex justify-center flex-wrap gap-2", className)}
    >
      <li
        className={classnames(baseStyles, {
          hidden: currentPage === 1,
        })}
        onClick={() => onPageChange(1)}
      >
        « {t("first page")}
      </li>
      <li
        className={classnames(baseStyles, {
          hidden: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        ‹ {t("prev")}
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "DOTS") {
          return (
            <li key={index} className="select-none hover:cursor-text">
              ...
            </li>
          );
        }
        return (
          <li
            key={index}
            className={classnames(baseStyles, {
              "text-black border-black hover:bg-white hover:!text-black hover:cursor-text":
                pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames(baseStyles, {
          hidden: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        {t("next")} ›
      </li>
      <li
        className={classnames(baseStyles, {
          hidden: currentPage === lastPage,
        })}
        onClick={() => onPageChange(lastPageNumber)}
      >
        {t("last page")} »
      </li>
    </ul>
  );
};

export default Pagination;
