import React, { useState } from 'react';
import styles from './Deposit.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Loader from '../components/loader';
import Modal from '../components/Modal/Modal';
import { FaRegCopy, FaCheck } from "react-icons/fa";

function Deposit() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [copied, setCopied] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hardcoded wallet addresses
  const wallets = {
    bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    usdt: "TYDnhyExNVEoYkGpZLW6RrHAFz2XYXK6Df"
  };

  // Function to get QR code URL from API
  const getQR = (text) => 
    `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=220x220`;

  const closeModal = () => {
    setIsError(false);
    setIsErrorInfo('');
  };

  // Copy functionality
  const copyToClipboard = (address, type) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Modal closeModal={closeModal} content={isErrorInfo} />}

      <div className={styles.screenContainer}>
        <SideBar active="Deposit" />
        <div className={styles.maindashboard}>
          <Header home={false} title="Deposit Fund" />

          <div className={styles.mainscreen}>
            <h3 className={styles.pageTitle}>
              Choose Your Deposit Method
            </h3>

            {/* Instruction text */}
            <p className={styles.instruction}>
              Please send your deposit to one of the wallet addresses below. 
              You can scan the QR code or copy the address directly. 
              Ensure you deposit only the correct coin type to the matching wallet.
            </p>

            <div className={styles.walletGrid}>
              {Object.entries(wallets).map(([type, address]) => (
                <div className={styles.walletCard} key={type}>
                  <h4>{type.toUpperCase()}</h4>

                  {/* QR code */}
                  <img src={getQR(address)} alt={`${type} QR`} className={styles.qrImage} />

                  {/* Horizontal wallet row */}
                  <div className={styles.walletRow}>
                    <p className={styles.addressText}>{address}</p>
                    <button 
                      className={styles.copyBtn} 
                      onClick={() => copyToClipboard(address, type)}
                    >
                      {copied === type ? <FaCheck /> : <FaRegCopy />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Deposit;




