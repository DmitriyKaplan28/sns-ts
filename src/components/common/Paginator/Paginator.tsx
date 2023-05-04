import React, {useState} from "react";
import styles from "./Paginator.module.css";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Paginator = ({
                              totalItemsCount,
                              pageSize,
                              currentPage,
                              onPageChanged,
                              portionSize
                          }: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)

    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = leftPortionNumber + portionSize - 1;

    const handlePreviousButton = () => {
        setPortionNumber(portionNumber - 1)
    }
    const handleNextButton = () => {
        setPortionNumber(portionNumber + 1)
    }

    return <div className={styles.paginator}>
        {portionNumber > 1 && <button onClick={handlePreviousButton}>Previous</button>}
        {
            pages.filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) =>
                <span
                    className={currentPage === p ? styles.selectedPage : styles.page}
                    onClick={() => {
                        onPageChanged(p)
                    }}>{p}</span>)
        }
        {portionCount > portionNumber &&
            <button onClick={handleNextButton}>Next</button>}
    </div>
}