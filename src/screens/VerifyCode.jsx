import React, { useState } from 'react';
import styles from './EmailVerify.module.css';
import { verifyLoginCode } from "../store/action/userAppStorage";
import { useDispatch } from "react-redux";

// importing modals
import LoadingModal from "../components/Modal/LoadingModal";
import Modal from "../components/Modal/Modal";

// importing routers
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../components/Submit";

function LoginCodeVerify() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [code, setCode] = useState('');

    const { id } = useParams(); // email passed via URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeModal = () => {
        setIsError(false);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!code || code.length < 4) {
            setIsError(true);
            setIsErrorInfo("Please enter a valid login code.");
            return;
        }

        setIsLoading(true);

        const res = await dispatch(verifyLoginCode(id, code));

        setIsLoading(false);

        if (!res.bool) {
            setIsError(true);
            setIsErrorInfo(res.message || "Invalid or expired code.");
            return;
        }

        // success
        navigate('/dashboard');
    };

    return (
        <>
            {isLoading && <LoadingModal />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

            <div className={styles.screenContainer}>
                <div className={styles.innerContainer}>
                    <h1 className={styles.verifyHead}>
                        Enter Login Code
                    </h1>

                    <p className={styles.verifyParagraph}>
                        We sent a login code to <span>{id}</span>.  
                        Enter the code below to continue to login.
                    </p>

                    <form onSubmit={submitHandler} className={styles.formContainer}>
                        
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={styles.inputField}
                                maxLength={6}
                            />
                        </div>

                        <SubmitBtn
                            text="Verify & Login"
                            style={{
                                borderRadius: '8px',
                                marginTop: '20px'
                            }}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginCodeVerify;
