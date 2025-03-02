import styles from "./CarDetailsPage.module.css"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations";
import {
  selectError,
  selectIsLoading,
  selectSelectedCar,
} from "../../redux/cars/selectors";
import CarDetails from "../../components/CarDetails/CarDetails";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"

const CarDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
      const car = useSelector(selectSelectedCar);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
  
    useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(fetchCarById(id));
    }, [dispatch, id]);
  
    return (
      <div className={styles.wrap}>
        {isLoading && <Loader />}
        {car && <CarDetails car={car}/>}
        {error && <ErrorMessage/>}
      </div>
    );
  };
  
  export default CarDetailsPage;