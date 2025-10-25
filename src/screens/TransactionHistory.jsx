import React, { useState, useEffect, useRef } from 'react';
import styles from './TransactionHistory.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { fetchTransfersAccount, fetchDeposits } from '../store/action/userAppStorage';
import Loader from '../components/Modal/LoadingModal';
import Modal from '../components/Modal/Modal';
import { useReactToPrint } from 'react-to-print';
import { FiEdit } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Utility for random time
const randomTime = () => {
  const hours = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const ampm = Math.random() > 0.5 ? "AM" : "PM";
  return `${hours}:${minutes} ${ampm}`;
};

// Receipt Modal Component
const ReceiptModal = ({ data, onClose, printRef, handlePrint }) => {
  if (!data) return null;

  // random time generator
  const randomTime = () => {
    const hours = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    const ampm = Math.random() > 0.5 ? "AM" : "PM";
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
          padding: "20px",
        }}
      >
        <motion.div
          ref={printRef}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px 20px",
            width: "100%",
            maxWidth: "380px", // ✅ keeps it from being too wide
            boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
            fontFamily: "Arial, sans-serif",
            position: "relative",
          borderTop: "4px solid #ee0979", // ✅ brand accent
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: "0", color: "#ee0979" }}>Bank Receipt</h2>
            <p style={{ fontSize: "12px", color: "#777" }}>
              {data.date.substring(0, 10)} | {randomTime()}
            </p>
          </div>

          {/* Receipt Body */}
          <div style={{ fontSize: "14px", color: "#333" }}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
              <span><b>Status:</b></span>
              <span style={{ color: data.status === "active" ? "#ee0979" : "red", fontWeight: 600 }}>
                {data.status === "active" ? "Complete" : "Pending"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
              <span><b>Description:</b></span>
              <span>{data.reason}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
              <span><b>Category:</b></span>
              <span>{data.transactionType}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
              <span><b>Amount:</b></span>
              <span style={{ fontWeight: "bold", color: "#ee0979" }}>
                ${Intl.NumberFormat().format(data.amount)}.00
              </span>
            </div>
            <hr style={{ margin: "15px 0", border: "none", borderTop: "1px dashed #ccc" }} />
            <div style={{ fontSize: "12px", textAlign: "center", color: "#555" }}>
              Thank you for banking with us.
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <button
              onClick={onClose}
              style={{
                background: "#ebebebff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                color:'black'
              }}
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              style={{
                background: "#ee0979", // ✅ brand color
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Print
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


function TransactionHistory() {
  let [isTransferData, setIsTransferData] = useState([])
  let [isDeposits, setIsDepositData] = useState([])
  let [isLoading, setIsLoading] = useState(false)
  let [isError, setIsError] = useState(false)
  let [isErrorInfo, setIsErrorInfo] = useState('')
  let { user } = useSelector(state => state.userAuth)

  let [receiptData, setReceiptData] = useState(null)

  let dispatch = useDispatch()
  let { color } = useSelector(state => state.userAuth)
  let navigate = useNavigate()

  useEffect(() => {
    fetchTransfer()
    fetchAllDeposit()
  }, [])

  let fetchTransfer = async () => {
    let res = await dispatch(fetchTransfersAccount())
    if (!res.bool) {
      setIsLoading(false)
      setIsError(true)
      setIsErrorInfo(res.message)
      return
    }
    setIsTransferData(res.message)
    setIsLoading(false)
  }

  let fetchAllDeposit = async () => {
    let res = await dispatch(fetchDeposits())
    if (!res.bool) {
      setIsLoading(false)
      setIsError(true)
      setIsErrorInfo(res.message)
      return
    }
    setIsDepositData(res.message)
    setIsLoading(false)
  }

  let closeModal = () => {
    setIsError(false)
  }

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Transaction Receipt',
    onAfterPrint: () => console.log('Printed PDF successfully!'),
  });

  let colorFun = (data) => {
    if (data === 'Transfer' || data === 'Debit' || data === 'withdraw') {
      return 'red'
    } else {
      return '#ee0979'
    }
  }

  return (<>
    {isLoading && <Loader />}
    {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

    <div className={styles.screenContainer}>
      <SideBar active={'History'} />
      <div className={styles.maindashboard} style={{ height: '100vh' }} >
        <Header home={false} title={'History'} />

        <div className={styles.mainscreen}>
          <div className={styles.mainscreenleft}>
            <div className={styles.helpCard} style={{ paddingTop: '40px' }}>
              <div className={styles.header}>
                <h6> <span className={styles.block}></span>RECENT TRANSACTIONS</h6>
              </div>

              <div className={styles.body}>
                <table style={{ width: '600px' }} >
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isDeposits && isDeposits.map((data, idx) => (
                      <tr key={idx}>
                        <td>
                          <span
                            className={styles.bullet}
                            style={{
                              backgroundColor: data.status === 'active'
                                ? '#ee0979'
                                : 'rgb(179, 179, 179)'
                            }}
                          ></span>
                          {data.status === 'active' ? 'Complete' : 'Pending'}
                        </td>
                        <td>{data.date.substring(0, 10)}</td>
                        <td>{data.reason}</td>
                        <td
                          className={styles.transactionType}
                          style={{ color: colorFun(data.transactionType) }}
                        >
                          {data.transactionType}
                        </td>
                        <td style={{ color: colorFun(data.transactionType) }}>
                          ${Intl.NumberFormat().format(data.amount)}.00
                        </td>
                        <td
                          style={{ cursor: "pointer", textAlign: "center" }}
                          onClick={() => setReceiptData(data)}
                        >
                          <FiEdit size={18} color="#6d6d6dff" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Receipt Modal */}
    {receiptData && (
      <ReceiptModal
        data={receiptData}
        onClose={() => setReceiptData(null)}
        printRef={componentRef}
        handlePrint={handlePrint}
      />
    )}
  </>);
}

export default TransactionHistory;

