import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarAudi from "../images/cars-big/audia1.jpg";
import CarMercedes from "../images/cars-big/benz.jpg";
import CarBmw from "../images/cars-big/bmw320.jpg";
import CarGolf from "../images/cars-big/golf6.jpg";
import CarPassat from "../images/cars-big/passatcc.jpg";
import CarToyota from "../images/cars-big/toyotacamry.jpg";

function BookCar() {
  const [modal, setModal] = useState(false);

  // booking car
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  // taking value of booking inputs
  const handleCar = (e) => {
    setCarType(e.target.value);
    setCarImg(e.target.value);
  };

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };

  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  // based on value name show car img
  let imgUrl;
  switch (carImg) {
    case "Audi A1 S-Line":
      imgUrl = CarAudi;
      break;
    case "VW Golf 6":
      imgUrl = CarGolf;
      break;
    case "Toyota Camry":
      imgUrl = CarToyota;
      break;
    case "BMW 320 ModernLine":
      imgUrl = CarBmw;
      break;
    case "Mercedes-Benz GLK":
      imgUrl = CarMercedes;
      break;
    case "VW Passat CC":
      imgUrl = CarPassat;
      break;
    default:
      imgUrl = "";
  }

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a vehicle</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
  <div className="box-form__car-type">
    <label>
      <i className="fa-solid fa-car"></i> &nbsp; Vehicle Type <b>*</b>
    </label>
    <input
      type="text"
      // value={carType}
      onChange={handleCar}
      placeholder="Enter your Vehicle type"
      style={{ width: "100%", padding: "10px", fontSize: "16px" }} // Increased size
    />
  </div>

  <div className="box-form__car-type">
    <label>
      <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up <b>*</b>
    </label>
    <input
      type="text"
      value={pickUp}
      onChange={handlePick}
      placeholder="Enter pick up location"
      style={{ width: "100%", padding: "10px", fontSize: "16px" }} // Increased size
    />
  </div>

  <div className="box-form__car-type">
    <label>
      <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off <b>*</b>
    </label>
    <input
      type="text"
      value={dropOff}
      onChange={handleDrop}
      placeholder="Enter drop off location"
      style={{ width: "100%", padding: "10px", fontSize: "16px" }} // Increased size
    />
  </div>

  <div className="box-form__car-time">
    <label htmlFor="picktime">
      <i className="fa-regular fa-calendar-days"></i> &nbsp; Pick-up <b>*</b>
    </label>
    <input
      id="picktime"
      value={pickTime}
      onChange={handlePickTime}
      type="date"
      style={{ width: "100%", padding: "10px", fontSize: "16px" }} // Increased size
    />
  </div>

  <div className="box-form__car-time">
    <label htmlFor="droptime">
      <i className="fa-regular fa-calendar-days"></i> &nbsp; Drop-off <b>*</b>
    </label>
    <input
      id="droptime"
      value={dropTime}
      onChange={handleDropTime}
      type="date"
      style={{ width: "100%", padding: "10px", fontSize: "16px" }} // Increased size
    />
  </div>

  <Link to="/get">
    <button type="submit">Search</button>
  </Link>
</form>
            </div>
          </div>
        </div>
      </section>

      {/* modal ------------------------------------ */}

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Vehicle Details</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>

        {/* car info */}
        <div className="booking-modal__car-info">
          <h5>Selected Vehicle</h5>
          <img src={imgUrl} alt="Selected car" />
          <p>Car Type: {carType}</p>
          <p>Pick-Up Location: {pickUp}</p>
          <p>Drop-Off Location: {dropOff}</p>
          <p>Pick-Up Date: {pickTime}</p>
          <p>Drop-Off Date: {dropTime}</p>
        </div>
      </div>
    </>
  );
}

export default BookCar;
