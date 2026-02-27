
import React, { useState, useEffect } from 'react';
import styles from './SendToCard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import ConfirmTransferModal from '../components/Modal/ConfirmTransfer';
import SuccessModal from '../components/Modal/SuccessModal';
import Loader from '../components/Modal/LoadingModal';
import Modal from '../components/Modal/Modal';
import OtpModal from '../components/Modal/OtpModal';
import ModeModal from '../components/Modal/TransferModal';
import PinModal from '../components/Modal/PinModal';

import {
    fetchAllAccount,
    sendAccount,
    sendAccountWithinBank
} from '../store/action/userAppStorage';


function SendToAccont() {

    //////////////////////////////////////////////////////
    // STATES
    //////////////////////////////////////////////////////

    const [isConfirm, setIsConfirm] = useState(false)

    const [amount, setAmount] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [routeNumber, setRouteNumber] = useState('')
    const [message, setMessage] = useState('')
    const [accountName, setAccountName] = useState('')
    const [nameOfBank, setNameOfBank] = useState('')
    const [nameOfCountry, setNameOfCountry] = useState('')

    const [isSuccessModal, setIsSuccessModal] = useState(false)

    const [isError, setIsError] = useState(false)
    const [isErrorInfo, setIsErrorInfo] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [isSuccessData, setIsSuccessData] = useState({})

    const [isOtp, setIsOtp] = useState(false)

    const [isMode, setIsMode] = useState(false)

    const [isMyBank, setIsMyBank] = useState(false)

    const [sourceAccountNumber, setSourceAccountNumber] = useState('')
    const [sourceAccount, setSourceAccount] = useState(null)

    const [allAccounts, setAllAccounts] = useState([])

    //////////////////////////////////////////////////////
    // PIN STATES
    //////////////////////////////////////////////////////

    const [isPinModal, setIsPinModal] = useState(false)
    const [enteredPin, setEnteredPin] = useState('')
    const [pinStatus, setPinStatus] = useState(null)


    //////////////////////////////////////////////////////
    // REDUX
    //////////////////////////////////////////////////////

    const dispatch = useDispatch()
    const { user, accounts } = useSelector(state => state.userAuth)


    //////////////////////////////////////////////////////
    // ROUTER
    //////////////////////////////////////////////////////

    const navigate = useNavigate()


    //////////////////////////////////////////////////////
    // LOAD ALL ACCOUNTS
    //////////////////////////////////////////////////////

    useEffect(() => {
        loadAccounts()
    }, [])


    const loadAccounts = async () => {

        setIsLoading(true)

        const res = await dispatch(fetchAllAccount())

        setIsLoading(false)

        if (!res.bool) {

            setIsError(true)
            setIsErrorInfo(res.message)

            return
        }

        setAllAccounts(res.message || [])

        setIsMode(true)
    }


    //////////////////////////////////////////////////////
    // SET SOURCE ACCOUNT
    //////////////////////////////////////////////////////

    useEffect(() => {

        if (accounts?.length > 0) {

            setSourceAccount(accounts[0])
            setSourceAccountNumber(accounts[0].accountNumber)

        }

    }, [accounts])


    //////////////////////////////////////////////////////
    // AUTO RESOLVE ACCOUNT NAME (ONLY FOR MY BANK)
    //////////////////////////////////////////////////////

    useEffect(() => {

        if (!isMyBank) return

        if (!accountNumber || accountNumber.length < 6) {

            setAccountName('')
            setRouteNumber('')
            setNameOfCountry('')
            return
        }

        if (accountNumber === sourceAccountNumber) {

            setAccountName('Cannot transfer to your own account')
            return
        }

        const found = allAccounts.find(
            acc => acc.accountNumber === accountNumber
        )

        if (found) {

            const fullName =
                `${found?.user?.firstName || ''} ${found?.user?.lastName || ''}`

            setAccountName(fullName)

            setRouteNumber(found?.user?.swiftNumber || '')

            setNameOfCountry(found?.user?.country || '')

            setNameOfBank(found?.bankName || 'Your Bank')

        }
        else {

            setAccountName('')
            setRouteNumber('')
            setNameOfCountry('')
        }

    }, [accountNumber, isMyBank, allAccounts, sourceAccountNumber])


    //////////////////////////////////////////////////////
    // MODE MODAL HANDLER
    //////////////////////////////////////////////////////

    const closeModeModal = (type) => {

        if (type === "myBank") {

            setIsMyBank(true)

        } else {

            setIsMyBank(false)

        }

        setIsMode(false)
    }


    //////////////////////////////////////////////////////
    // INPUT HANDLER
    //////////////////////////////////////////////////////

    const onChangeHandler = (name, value) => {

        if (name === "accountNumber") setAccountNumber(value)

        if (name === "amount") setAmount(value)

        if (name === "routeNumber") setRouteNumber(value)

        if (name === "message") setMessage(value)

        if (name === "nameOfBank") setNameOfBank(value)

        if (name === "nameOfAccount") setAccountName(value)

        if (name === "nameOfCountry") setNameOfCountry(value)
    }


    //////////////////////////////////////////////////////
    // SUBMIT
    //////////////////////////////////////////////////////

    const submitHandler = (e) => {

        e.preventDefault()

        if (!accountNumber || !amount) {

            setIsError(true)
            setIsErrorInfo("Please fill all required fields")

            return
        }

        if (!accountName) {

            setIsError(true)
            setIsErrorInfo("Please enter recipient account name")

            return
        }

        setIsConfirm(true)
    }


    //////////////////////////////////////////////////////
    // EXECUTE TRANSFER
    //////////////////////////////////////////////////////

    const executeTransfer = async () => {

        setIsLoading(true)

        const res =
            await dispatch(

                isMyBank ?

                    sendAccountWithinBank({

                        amount,
                        accountNumber,
                        accountName,
                        message,
                        sourceAccount

                    })

                    :

                    sendAccount({

                        amount,
                        accountNumber,
                        accountName,
                        nameOfBank,
                        routeNumber,
                        nameOfCountry,
                        message,
                        sourceAccount

                    })
            )

        setIsLoading(false)

        if (!res.bool) {

            setIsError(true)
            setIsErrorInfo(res.message)
            if(res.url){
                navigate(`/${res.url}`)
            }

            return
        }

        setIsSuccessModal(true)

        setIsSuccessData({

            amount,
            accountNumber,
            accountName,
            nameOfBank
        })
    }


    //////////////////////////////////////////////////////
    // OTP → PIN FLOW
    //////////////////////////////////////////////////////

    const resubmitHandler = (e) => {

        e.preventDefault()

        if (!user?.otpVerified) {

            setIsConfirm(false)
            setIsOtp(true)

            return
        }

        setIsConfirm(false)
        setIsPinModal(true)
    }


    //////////////////////////////////////////////////////
    // VERIFY PIN
    //////////////////////////////////////////////////////

    const verifyPinHandler = () => {

        if (!enteredPin) return

        setPinStatus("checking")

        setTimeout(() => {

            if (enteredPin === user?.pin) {

                setPinStatus("success")

                setTimeout(() => {

                    setIsPinModal(false)
                    setEnteredPin('')
                    setPinStatus(null)

                    executeTransfer()

                }, 500)

            }
            else {

                setPinStatus("error")

                setTimeout(() => {

                    setEnteredPin('')
                    setPinStatus(null)

                }, 500)
            }

        }, 500)
    }


    //////////////////////////////////////////////////////
    // CLOSE HANDLERS
    //////////////////////////////////////////////////////

    const closeOtpModal = () => setIsOtp(false)

    const closeSuccessModal = () => {

        setIsSuccessModal(false)

        setAccountNumber('')
        setAmount('')
        setAccountName('')
        setRouteNumber('')
        setNameOfCountry('')
        setNameOfBank('')
    }

    const cancelPayment = () => setIsConfirm(false)

    const closeErrorModal = () => setIsError(false)


    //////////////////////////////////////////////////////
    // UI
    //////////////////////////////////////////////////////

    return (

        <>

            {isMode &&
                <ModeModal closeFavorite={closeModeModal} />
            }

            {isOtp &&
                <OtpModal closeModal={closeOtpModal} />
            }

            {isPinModal &&
                <PinModal
                    enteredPin={enteredPin}
                    setEnteredPin={setEnteredPin}
                    verifyPinHandler={verifyPinHandler}
                    pinStatus={pinStatus}
                    closeModal={() => setIsPinModal(false)}
                />
            }

            {isLoading && <Loader />}

            {isError &&
                <Modal
                    closeModal={closeErrorModal}
                    content={isErrorInfo}
                />
            }

            {isSuccessModal &&
                <SuccessModal
                    data={isSuccessData}
                    closeFavorite={closeSuccessModal}
                />
            }

            {isConfirm &&
                <ConfirmTransferModal
                    cancelPayment={cancelPayment}
                    resubmitHandler={resubmitHandler}
                    modify={onChangeHandler}
                    data={{
                        amount,
                        accountNumber,
                        accountName,
                        nameOfBank
                    }}
                />
            }


            <div className={styles.screenContainer}>

                <SideBar active="Transfer" />

                <div className={styles.maindashboard}>

                    <Header title="Transfer" />

                    <div className={styles.mainscreen} >



                        <form
                            className={styles.form}
                            onSubmit={submitHandler}
                        >

                            <label style={{ marginBottom: '100px',fontSize:'1.5rem',textAlign:'center' }}>Enter Recipient Information</label>

                            <input
                                type="text"
                                placeholder="Account Number"
                                value={accountNumber}
                                onChange={(e) =>
                                    onChangeHandler("accountNumber", e.target.value)
                                }
                                required
                            />

                            {/* ACCOUNT NAME FIELD (FIXED) */}
                            <input
                                type="text"
                                placeholder="Account Name"
                                value={accountName}
                                onChange={(e) =>
                                    onChangeHandler("nameOfAccount", e.target.value)
                                }
                                readOnly={isMyBank} // editable only for other bank
                                required
                            />

                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) =>
                                    onChangeHandler("amount", e.target.value)
                                }
                                required
                            />

                            <button type="submit">
                                Transfer
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>
    )
}

export default SendToAccont


