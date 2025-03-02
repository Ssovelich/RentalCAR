import styles from "./CarDetails.module.css";
import Booking from "../Booking/Booking";
import Icons from "../Icons/Icons";
import { Toaster } from "react-hot-toast";

const CarDetails = ({ car }) => {
  const addressParts = car.address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];
  const carType = car.type;
  const formatCarType =
    carType.charAt(0).toUpperCase() + carType.slice(1).toLowerCase();

  return (
    <div className={styles.carWrap}>
      <img src={car.img} alt={car.description} className={styles.img} />
      <Toaster />
      <Booking />
      <div className={styles.wrapTitle}>
        <h1 className={styles.title}>
          {car.brand} {car.model}
          <span className={styles.id}>id: {car.mileage}</span>
        </h1>
        <div className={styles.location}>
          <Icons name="location" />
          <span className={styles.locationAddress}>
            {city}, {country}
          </span>
          <span>Mileage: {car.mileage.toLocaleString("uk-UA")} km</span>
        </div>
        <p className={styles.price}>{car.rentalPrice} $</p>
        <p className={styles.text}>{car.description}</p>
      </div>
      <div className={styles.wrapperDescription}>
        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>Rental Conditions:</h2>
          <div className={styles.descriptionItem}>
            <Icons name="check" />
            <p>{car.rentalConditions[0]}</p>
          </div>
          <div className={styles.descriptionItem}>
            <Icons name="check" />
            <p>{car.rentalConditions[2]}</p>
          </div>
          <div className={styles.descriptionItem}>
            <Icons name="check" />
            <p>{car.rentalConditions[1]}</p>
          </div>
        </div>
        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>Car Specifications:</h2>
          <div className={styles.descriptionItem}>
            <Icons name="calendar" />
            <p>Year: {car.year}</p>
          </div>
          <div className={styles.descriptionItem}>
            <Icons name="car" />
            <p>Type: {formatCarType}</p>
          </div>
          <div className={styles.descriptionItem}>
            <Icons name="patrol" />
            <p>Fuel Consumption: {car.fuelConsumption}</p>
          </div>
          <div className={styles.descriptionItem}>
            <Icons name="settings" />
            <p>Engine Size: {car.engineSize}</p>
          </div>
        </div>
        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>
            Accessories and functionalities:
          </h2>
          {car?.functionalities?.length > 0 ? (
            car.functionalities.map((item) => (
              <div key={item} className={styles.descriptionItem}>
                <Icons name="check" />
                <p>{item}</p>
              </div>
            ))
          ) : (
            <p>No information available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
