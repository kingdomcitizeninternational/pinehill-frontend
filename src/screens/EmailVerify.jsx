import React, { useState, useEffect } from 'react';
import styles from './EmailVerify.module.css';
import { checkverification } from "../store/action/userAppStorage";
import { useDispatch } from "react-redux";
// importing modals
import LoadingModal from "../components/Modal/LoadingModal";
import Modal from "../components/Modal/Modal";
// importing routers
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../components/Submit";

function EmailVerify() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isSignout, setIsSignout] = useState(false);
    const [preloader, setPreloader] = useState(true);

    const { id } = useParams();   // ✅ extract param "id" from URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeModal = () => {
        setIsError(false);
        setIsSignout(false);
    };

    useEffect(() => {
        if (!id) {
            navigate('/signup');
        }
    }, [id, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPreloader(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const continueHandler = async () => {
        if (!id) return;
        const res = await dispatch(checkverification(id)); // ✅ use id
        if (!res.bool) {
            console.log(res);
            return;
        }
        // navigate('/phone-setup');
    };

    useEffect(() => {
        const interval = setInterval(continueHandler, 1000);
        return () => clearInterval(interval);
    }, [id]);

    const submitHandler = () => {
        navigate('/signup');
    };

    return (
        <>
            {isLoading && <LoadingModal />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

            <div className={styles.screenContainer}>
                <div className={styles.innerContainer}>
                    <h1 className={styles.verifyHead}>Verify your email</h1>
                    <p className={styles.verifyParagraph}>
                        We sent a verification email to <span>{id}</span>. 
                        Click the link inside to get started!
                    </p>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
                    }}>
                        <SubmitBtn 
                            text="Email didn't arrive?" 
                            style={{ borderRadius: '8px', marginBottom: '15px', marginTop: '15px' }} 
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
//tst
export default EmailVerify;

