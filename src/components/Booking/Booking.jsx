import styles from "./Booking.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Booking request created!");
    setBookingData({ name: "", email: "", date: "", comment: "" });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.text}>
        Stay connected! We are always ready to help you.
      </p>
      <div className={styles.wrapperInput}>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={bookingData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          value={bookingData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className={styles.input}
          type="date"
          name="date"
          value={bookingData.date}
          onChange={handleChange}
          placeholder="Booking date"
        />
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          type="textarea"
          name="comment"
          value={bookingData.comment}
          onChange={handleChange}
          placeholder="Comment"
        />
      </div>
      <button className={styles.btn} type="submit">
        Send
      </button>
    </form>
  );
};

export default Booking;
