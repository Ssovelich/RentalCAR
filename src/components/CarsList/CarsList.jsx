import styles from "./CarsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  selectCars,
  selectError,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from "../../redux/cars/selectors";
import { fetchCars } from "../../redux/cars/operations";
import { setPage } from "../../redux/cars/slice";
import CarItem from "../CarItem/CarItem";
import SearchBar from "../SearchBar/SearchBar";
import { selectFilter } from "../../redux/filter/selectors";
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const CarsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const page = useSelector(selectPage);
  const filters = useSelector(selectFilter);
  const cars = useSelector(selectCars);
  const totalPages = useSelector(selectTotalPages);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (location.pathname === "/catalog") {
      dispatch(fetchCars({ page, filters }));
    }
  }, [dispatch, page, filters, location.pathname]);

  const uniqueCars = Array.from(
    new Map(cars.map((car) => [car.id, car])).values()
  );

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  useEffect(() => {
    if (page > 1) {
      const cardHeight = 276;
      const rows = 2;
      const gap = 90;
      window.scrollBy({
        top: cardHeight * rows + gap,
        behavior: "smooth",
      });
    }
  }, [cars]);

  return (
    <div>
      <SearchBar />
      <ul className={styles.list}>
        {!error && isLoading && page === 1 ? (
          <></>
        ) : uniqueCars.length > 0 ? (
          uniqueCars.map((car) => (
            <li key={car.id} className={styles.item}>
              <CarItem car={car} />
            </li>
          ))
        ) : (
          <ErrorMessage/>
        )}
      </ul>
      {!isLoading && !error && uniqueCars.length > 0 && page < totalPages && (
        <button
          className={styles.btn}
          variant="loadmore"
          type="button"
          onClick={handleLoadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default CarsList;