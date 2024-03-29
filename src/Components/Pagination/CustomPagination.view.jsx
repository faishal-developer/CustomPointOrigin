import React from 'react';
import classnames from 'classnames';
import { usePagination } from './logic';
import './static/style.scss';
const Pagination = props => {
    //   const {
    //     onPageChange,
    //     totalCount,
    //     siblingCount = 1,
    //     currentPage,
    //     pageSize,
    //     className
    //   } = props;

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
        dynamo
    } = { onPageChange: props.onPageChange, totalCount: props.totalPage, currentPage: props.currentPage, pageSize: 1, className: "pagination-bar" };

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount: 1,
        pageSize
    });

    // const paginationRange = [1, 2, 3, 4, 5, 6, 7, 8]


    const DOTS = "DOTS";
    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || totalCount < 1) {
        return (
            <div>
                {props.children}
            </div>
        )

    }

    const onNext = () => {
        onPageChange(currentPage + 1);
        props.setCurrentPage(currentPage + 1)
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
        props.setCurrentPage(currentPage - 1)
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className="pagination-component">
            <div>
                {props.children}
            </div>
            <div className="pagination-component-wrapper">
                <hr />
                <ul
                    className={classnames('pagination-container', { [className]: className })}
                >
                    {/* Left navigation arrow */}
                    <li
                        className={classnames('pagination-item', {
                            disabled: currentPage === 1
                        })}
                        onClick={onPrevious}
                    >
                        <div className="arrow left" />
                    </li>
                    {paginationRange.map((pageNumber, index) => {

                        // If the pageItem is a DOT, render the DOTS unicode character
                        if (pageNumber === DOTS) {
                            return <li className="pagination-item dots" key={index}>&#8230;</li>;
                        }

                        // Render our Page Pills
                        return (
                            <li
                                className={classnames('pagination-item', {
                                    selected: pageNumber === currentPage
                                })}
                                onClick={() => {
                                    onPageChange(pageNumber)
                                    props.setCurrentPage(pageNumber)
                                }}
                                key={index}
                            >
                                {pageNumber}
                            </li>
                        );
                    })}
                    {/*  Right Navigation arrow */}
                    <li
                        className={classnames('pagination-item', {
                            disabled: currentPage === lastPage
                        })}
                        onClick={onNext}
                    >
                        <div className="arrow right" />
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    );
};

export default Pagination;
