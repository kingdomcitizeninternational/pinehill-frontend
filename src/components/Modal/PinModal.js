import React, { useEffect, useRef } from "react";
import styles from "./PinModal.module.css";

function PinModal({
    closeModal,
    enteredPin,
    setEnteredPin,
    verifyPinHandler,
    pinStatus
}) {

    const inputRef = useRef(null)

    useEffect(() => {

        inputRef.current?.focus()

    }, [])



    const handleChange = (e) => {

        const value = e.target.value

        /// allow only numbers and max 4 digits
        if (/^\d*$/.test(value) && value.length <= 4) {

            setEnteredPin(value)

        }

    }



    const handleSubmit = (e) => {

        e.preventDefault()

        if (enteredPin.length === 4) {

            verifyPinHandler()

        }

    }



    const getStatusText = () => {

        if (pinStatus === "checking")
            return "Verifying PIN..."

        if (pinStatus === "success")
            return "PIN verified"

        if (pinStatus === "error")
            return "Incorrect PIN"

        return ""
    }



    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>
                 <button
                        className={styles.closeBtn}
                        onClick={closeModal}
                    >
                        ×
                    </button>

                <div className={styles.header}>

                    <p>Enter Transaction PIN</p>

                   

                </div>



                <form onSubmit={handleSubmit}>

                    <input
                        ref={inputRef}
                        type="password"
                        value={enteredPin}
                        onChange={handleChange}
                        className={styles.pinInput}
                        placeholder="••••"
                        maxLength={4}
                    />



                    <div className={styles.status}>

                        {getStatusText()}

                    </div>



                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={
                            enteredPin.length !== 4 ||
                            pinStatus === "checking"
                        }
                    >
                        Confirm Transfer
                    </button>

                </form>

            </div>

        </div>

    )

}

export default PinModal