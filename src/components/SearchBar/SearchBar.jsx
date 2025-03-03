import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchBrands, fetchCars } from "../../redux/cars/operations";
import { setFilter } from "../../redux/filter/slice";
import { selectBrands } from "../../redux/cars/selectors";
import CustomSelector from "../../components/CustomSelector/CustomSelector";

const SearchBar = () => {
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const allBrands = useSelector(selectBrands);
  const [openSelector, setOpenSelector] = useState(null);
  const [localFilters, setLocalFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenSelector(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setOpenSelector]);

  const generatePrices = () => {
    let price = [];
    for (let i = 30; i <= 100; i += 10) {
      price.push(i);
    }
    return price;
  };

  const prices = generatePrices();

  const brandOptions = allBrands.map((brand) => ({
    value: brand,
    label: brand,
  }));
  const priceOptions = prices.map((price) => ({
    value: price,
    label: price,
  }));

  const handleChange = (name, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: name.includes("Mileage")
        ? Number(value.replace(/\D/g, "")) || ""
        : value || "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenSelector(null);
    dispatch(setFilter(localFilters));
    dispatch(fetchCars({ page: 1, filters: localFilters }));
  };

  const handleReset = () => {
    const resetFilters = {
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    };
    setLocalFilters(resetFilters);
    dispatch(setFilter(resetFilters));
    dispatch(fetchCars({ page: 1, filters: resetFilters }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={filterRef}>
      <div>
        <p className={styles.labelText}>Car brand</p>
        <CustomSelector
          options={brandOptions}
          id="brand"
          value={localFilters.brand}
          onChange={(val) => handleChange("brand", val)}
          placeholder="Choose a brand"
          isOpen={openSelector === "brand"}
          setOpenSelector={setOpenSelector}
        />
      </div>
      <div>
        <p className={styles.labelText}>Price / 1hour</p>
        <CustomSelector
          options={priceOptions}
          id="price"
          value={localFilters.rentalPrice}
          onChange={(val) => handleChange("rentalPrice", val)}
          placeholder="Choose a price"
          formatValue={(val) => (val ? `To $${val}` : "Choose a price")}
          isOpen={openSelector === "price"}
          setOpenSelector={setOpenSelector}
        />
      </div>
      <div>
        <p className={styles.labelText}>Car mileage / km</p>
        <div className={styles.wrapInputMileage}>
          <input
            className={`${styles.input} ${styles.inputMileage}`}
            type="text"
            name="minMileage"
            value={localFilters.minMileage ? `From ${Number(localFilters.minMileage).toLocaleString("en-US")}` : "From "}
            onChange={(event) => handleChange("minMileage", event.target.value)}
          />
          <input
            className={`${styles.input} ${styles.inputMileage}`}
            type="text"
            name="maxMileage"
            value={localFilters.maxMileage ? `To ${Number(localFilters.maxMileage).toLocaleString("en-US")}` : "To "}
            onChange={(event) => handleChange("maxMileage", event.target.value)}
          />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn} type="submit">
          Search
        </button>
        <button className={styles.btn} type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;