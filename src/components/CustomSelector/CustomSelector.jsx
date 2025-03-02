import styles from "./CustomSelector.module.css";
import Icons from "../Icons/Icons";

const CustomSelector = ({
  id,
  value,
  options,
  placeholder,
  onChange,
  formatValue,
  isOpen,
  setOpenSelector,
}) => {
  const handleSelect = (option) => {
    onChange(option.value);
    setOpenSelector(null);
  };

  const handleToggle = () => {
    setOpenSelector((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.selectWrap}>
      <div className={styles.select} onClick={handleToggle}>
        {formatValue ? formatValue(value) : value || placeholder}
        <Icons name="arrow-down" className={`${styles.selectIcon} ${isOpen ? styles.open : ""}`} />
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelector;