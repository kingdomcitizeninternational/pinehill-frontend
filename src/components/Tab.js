import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineArrowTrendingUp,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { FaCirclePlus } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Tab.module.css";

const tabs = [
  { name: "Home", path: "dashboard", icon: <HiOutlineHome size={24} /> },
  { name: "Deposit", path: "deposit", icon: <HiOutlineCreditCard size={24} /> },
  { name: "Transfer", path: "transfer", icon: <HiOutlineArrowTrendingUp size={24} /> },
  { name: "Explore", path: "settings", icon: <HiOutlineGlobeAlt size={24} /> },
];

function Tab() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      className={styles.tabContainer}
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {tabs.slice(0, 2).map((tab) => (
        <motion.div
          key={tab.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/${tab.path}`)}
          className={`${styles.tabItem} ${
            location.pathname.includes(tab.path) ? styles.active : ""
          }`}
        >
          {tab.icon}
          <span>{tab.name}</span>
          <AnimatePresence>
            {location.pathname.includes(tab.path) && (
              <motion.div
                layoutId="underline"
                className={styles.activeIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Middle Floating Add Button */}
      <motion.div
        whileHover={{ rotate: 90, scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className={styles.addButton}
        onClick={() => navigate("/beneficiaries")}
      >
        <FaCirclePlus size={42} />
      </motion.div>

      {tabs.slice(2).map((tab) => (
        <motion.div
          key={tab.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/${tab.path}`)}
          className={`${styles.tabItem} ${
            location.pathname.includes(tab.path) ? styles.active : ""
          }`}
        >
          {tab.icon}
          <span>{tab.name}</span>
          <AnimatePresence>
            {location.pathname.includes(tab.path) && (
              <motion.div
                layoutId="underline"
                className={styles.activeIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Tab;



