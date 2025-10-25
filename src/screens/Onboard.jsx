import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Onboard.module.css";

const Onboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome"); // redirect to login
    }, 5000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div>
        <img
          src={"../../assets/img/bank_logo.png"}
          alt="Bank Logo"
          width={"200px"}
          className={styles.logo}
        />
      </div>
    </div>
  );
};

export default Onboard;
