import styles from "./CarItem.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { toggleFavoriteCar } from "../../redux/cars/slice";
import { selectFavoriteCars } from "../../redux/cars/selectors";

const CarItem = ({ car }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteCars = useSelector(selectFavoriteCars);
  const isFavorite = favoriteCars.includes(car.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCar(car.id));
  };

  const addressParts = car.address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];
  const carType =
    car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();
  const carModel = car.model.split("-").join(" ").split(" ");
  const modifiedCarModel =
    carModel.length === 1 ? carModel[0] : `${carModel[0]} ${carModel[1]}`;

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={car.img} alt={car.description} className={styles.img} />
        <button
          onClick={handleToggleFavorite}
          type="button"
          className={styles.btnIcon}
        >
          <Icons name={isFavorite ? "heart-stroke" : "heart"} />
        </button>
      </div>
      <div className={styles.wrapTitle}>
        <p className={styles.title}>
          {car.brand} <span className={styles.model}>{modifiedCarModel}</span>,{" "}
          {car.year}
        </p>
        <p className={styles.title}>{car.rentalPrice} $</p>
      </div>
      <div className={styles.wrapDetails}>
        <div className={styles.details}>
          <span className={styles.span}>{city}</span>
          <span className={styles.span}>{country}</span>
          <span className={styles.span}>{car.rentalCompany}</span>
        </div>
        <div className={styles.details}>
          <span className={styles.span}>{carType}</span>
          <span>{car.mileage.toLocaleString("uk-UA")} km</span>
        </div>
      </div>
      <button
        className={styles.btn}
        type="button"
        onClick={() => navigate(`/catalog/${car.id}`)}
      >
        Read more
      </button>
    </div>
  );
};

export default CarItem;
