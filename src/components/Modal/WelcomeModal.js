import { useSelector } from "react-redux";
import styles from "./Welcome.module.css";
import { motion, AnimatePresence } from "framer-motion";

let WelcomeModal = ({ closeFavorite }) => {
    let { user } = useSelector(state => state.userAuth);

    return (
        <AnimatePresence>
            <motion.div 
                className={styles.favoriteListCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div 
                    className={styles.favoriteCard}
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <div className={styles.body}>
                        <h4>Welcome Back!</h4>
                        <p>
                            Please note that your details and login information are fully secured. 
                            Transactions performed are not shared with any third parties.
                        </p>

                        <button onClick={closeFavorite}>
                            OK, Continue
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default WelcomeModal;
