import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/catalog");
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Find your perfect rental car</h1>
      <p className={styles.text}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <button className={styles.btn} onClick={handleNavigate} type="button">
        View Catalog
      </button>
    </div>
  );
};

export default HomePage;
