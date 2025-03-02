import styles from "./CatalogPage.module.css";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import CarsList from "../../components/CarsList/CarsList";
import { selectIsLoading } from "../../redux/cars/selectors";

const CatalogPage = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={styles.wrap}>
      <CarsList />
      {isLoading && <Loader />}
    </div>
  );
};

export default CatalogPage;
