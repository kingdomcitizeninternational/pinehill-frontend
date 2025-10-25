import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Welcome.module.css'; 
import { useNavigate } from 'react-router-dom';
import Loader from "../components/loader";

function LandingPage() {
    let [preloader, setPreloader] = useState(true);
    let navigate = useNavigate();

    const toLogin = () => {
        navigate('/login');
    };

    const toSignup = () => {
        navigate('/signup');
    };

    useEffect(() => {
        setTimeout(() => {
            setPreloader(false);
        }, 3000); // shorter splash
    }, []);

    return (
        <>
          {preloader && <Loader />}
            <div className={styles.screenContainer}>
              
                {!preloader && (
                    <div className={styles.rightContainer}>
                        <motion.div 
                            className={styles.rightformcontainer}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.div 
                                className={styles.navigate}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <h2 style={{fontSize:'2rem',color:'#fff'}}>Welcome</h2>
                            </motion.div>

                            <motion.p 
                                className={styles.welcomeText}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            >
                                Your comprehensive banking solution for the modern world.
                            </motion.p>

                            <motion.div 
                                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                            >
                                <button 
                                    style={{
                                        padding: '12px',
                                        borderRadius: '20px',
                                        backgroundColor: '#ee0979',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    onClick={toLogin}
                                >
                                    Login
                                </button>

                                <button 
                                    style={{
                                        padding: '12px',
                                        borderRadius: '20px',
                                        backgroundColor: 'white',
                                        color: '#ee0979',
                                        border: '2px solid #ee0979',
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    onClick={toSignup}
                                >
                                    Sign Up
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </div>
        </>
    );
}

export default LandingPage;

