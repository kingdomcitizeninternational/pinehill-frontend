import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Tab from '../components/Tab';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import WelcomeModal from '../components/Modal/WelcomeModal';
import PaymentModal from '../components/Modal/PaymentModal';
import { fetchDeposits, fetchAccounts } from '../store/action/userAppStorage';
import Modal from '../components/Modal/Modal';
import Loader from '../components/loader';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { motion } from "framer-motion";
import { FaExchangeAlt, FaCreditCard, FaUniversity } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useCurrency } from '../hooks/useCurrency';

function Dashboard() {
  let [isError, setIsError] = useState(false);
  let [isUrl, setIsUrl] = useState(false);
  const { formatBalance, formatTransaction } = useCurrency();

  let { user, cards, loans, histories } = useSelector(state => state.userAuth);
  let navigate = useNavigate();
  let [isWelcome, setIsWelcome] = useState(true);
  let [isShow, setIsShow] = useState(true);
  let [isPay, setIsPay] = useState(false);
  let [isDeposits, setIsDeposits] = useState([]);
  let [amount, setAmount] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [isErrorInfo, setIsErrorInfo] = useState('');
  let [isAccount, setIsAccount] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    fetchDeposit();
    fetchAccount();
  }, []);

  let fetchDeposit = async () => {
    setIsLoading(true);
    let res = await dispatch(fetchDeposits());
    if (!res.bool) {
      setIsLoading(false);
      return;
    }
    setIsDeposits(res.message);
    setIsLoading(false);
  };

  let fetchAccount = async () => {
    setIsLoading(true);
    let res = await dispatch(fetchAccounts());
    if (!res.bool) {
      setIsLoading(false);
      return;
    }
    setIsAccount(res.message);
    setIsLoading(false);
  };

  let navigateHandler = (data) => {
    navigate(`/${data}`);
  };

  let clickHandler = () => {
    setIsErrorInfo('Contact customer care support to continue');
    setIsError(true);
  };

  let menuHandler = (e) => {
    navigate(`/${e}`);
  };

  let closeWelcomeModal = () => setIsWelcome(false);
  let payHandler = () => setIsPay(true);
  let togglePayModal = () => setIsPay(false);
  let changeHandler = () => setIsShow(prev => !prev);

  let closeModal = () => {
    setIsError(false);
    setIsErrorInfo('');
  };

  let day = () => {
    var now = new Date(), hour = now.getHours();
    var morning = (hour >= 4 && hour <= 11),
      afternoon = (hour >= 12 && hour <= 16),
      evening = (hour >= 17 && hour <= 20),
      night = (hour >= 21 || hour <= 3);

    if (morning) return 'MORNING';
    if (afternoon) return 'AFTERNOON';
    if (evening) return 'EVENING';
    if (night) return 'NIGHT';
  };

  let colorFun = (data) => {
    if (data === 'Transfer') return 'red';
    if (data === 'Debit') return 'red';
    if (data === 'withdraw') return 'red';
    return '#ee0979';
  };


  const navigateDeposit = () => {
    navigate('/deposit')

  }

  const navigateTransfer = () => {
    navigate('/transfer')
  }


  const handleViewAll = () => {
    navigate('/transaction-history');
  }

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Modal closeModal={closeModal} content={isErrorInfo} />}
      {isPay ? <PaymentModal closeFun={togglePayModal} /> : ''}
      {isWelcome && <WelcomeModal closeFavorite={closeWelcomeModal} />}

      <div className={styles.screenContainer}>
        <SideBar active={'home'} />
        <div className={styles.maindashboard}>
          <Header home={true} title={'Dashboard'} />

          <div className={styles.mainscreen}>
            <div className={styles.mainscreenleft}>

              <h2
                className={styles.gradientText}
              >
                GOOD {day()}, {user.firstName}!
              </h2>

              {isAccount.map((data, index) => (
                <div className={styles.chartSection} key={data.accountNumber}>
                  <div className={styles.bankInfoCon}>
                    <div className={styles.bankInfo} style={{ display: 'flex' }}>
                      <p className={styles.accountType}>{data.accountType}.........</p>
                      <p className={styles.accountType}>{data.accountNumber}</p>
                    </div>

                    <div className={styles.bankInfo}>
                      <p className={styles.accountBalance}>
                        {formatBalance(data.Balance)}
                      </p>
                    </div>

                    {/* Action Buttons - show only for first account */}
                    {index === 0 && (
                      <div className={styles.actionButtons}>

                        <button
                          className={`${styles.cardButton} ${styles.secondaryBtn}`}
                          onClick={navigateTransfer} style={{ color: 'red' }}
                        >
                          Transfer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}


              {/* Floating draggable Add Account Button (Framer Motion drag) */}
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.15}
                style={{
                  position: "fixed",
                  bottom: 150,
                  right: 30,
                  zIndex: 50,
                  cursor: "grab",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  onClick={clickHandler}
                  style={{
                    background: "linear-gradient(135deg, #ee0979,#ee0979",
                    color: "white",
                    border: "none",
                    padding: "15px 22px",
                    borderRadius: "50px",
                    fontSize: "16px",
                    fontWeight: 600,
                    boxShadow: "0 8px 20px rgba(109,156,109,0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                  animate={{
                    scale: [1, 1.08, 1], // pulse effect
                    boxShadow: [
                      "0 8px 20px rgba(109,156,109,0.4)",
                      "0 12px 25px rgba(109,156,109,0.6)",
                      "0 8px 20px rgba(109,156,109,0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MdAdd size={22} />
New Account
                </motion.button>
              </motion.div>


              {cards.length > 0 && cards.map(data => (
                <div key={data._id}>
                  <div className={styles.cardContainer}>
                    <div style={{ textAlign: "left" }} className={styles.customCardWrapper}>
                      <Cards
                        number={data.cardNumber}
                        expiry={data.expiry}
                        cvc={data.cvv}
                        name={`${user.firstName} ${user.lastName}`}
                      />


                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <label>Card balance</label>
                    <input value={formatBalance(data.Balance)} readOnly />
                  </div>
                </div>
              ))}

              <div className={styles.metricsContainer}>
                <div
                  className={styles.metricCard}
                  onClick={() => menuHandler("transaction-history")}
                >
                  <FaExchangeAlt className={styles.metricIcon} />
                  <p className={styles.number}>{histories.length}</p>
                  <h5 className={styles.title}>Transactions</h5>
                </div>

                <div
                  className={styles.metricCard}
                  onClick={() => menuHandler("card")}
                >
                  <FaCreditCard className={styles.metricIcon} />
                  <p className={styles.number}>{cards.length}</p>
                  <h5 className={styles.title}>Cards</h5>
                </div>

              </div>

              <div className={styles.summaryContainer}>
                <div className={styles.passportContainer}>
                  <h4 className={styles.sectionTitle}>Account Passport</h4>
                  <div className={styles.imgWrapper}>
                    <img src={user.passportUrl} className={styles.img} alt="User Passport" />
                  </div>
                </div>

                <div className={styles.summary}>
                  <h4 className={styles.sectionTitle}>Basic Info</h4>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Account Name:</span>
                    <span className={styles.value}>{user.firstName} {user.lastName}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Country:</span>
                    <span className={styles.value}>{user.country}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Account Status:</span>
                    <span
                      className={`${styles.status} ${user.accountVerified ? styles.active : styles.inactive}`}
                    >
                      {user.accountVerified ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>


              <div className={styles.helpCard}>
                <div className={styles.header}>
                  <h4 style={{ fontWeight: '300', fontFamily: 'ABeeZee' }}>
                    <span className={styles.block}></span>Recent transactions
                  </h4>
                </div>

                <div className={styles.body}>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ fontWeight: '300' }}>Status</th>
                        <th style={{ fontWeight: '300' }}>Date</th>
                        <th style={{ fontWeight: '300' }}>Description</th>
                        <th style={{ fontWeight: '300' }}>Category</th>
                        <th style={{ fontWeight: '300' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isDeposits && isDeposits.slice(0, 1).map(data => (
                        <tr key={data._id || `${data.date}-${data.amount}`}>
                          <td>
                            <span
                              className={styles.bullet}
                              style={{ backgroundColor: data.status === 'active' ? '#ee0979' : 'rgb(179, 179, 179)' }}
                            />
                            {data.status === 'active' ? 'Complete' : 'Pending'}
                          </td>
                          <td>{data.date.substring(0, 10)}</td>
                          <td>{data.reason}</td>
                          <td className={styles.transactionType} style={{ color: colorFun(data.transactionType) }}>
                            {data.transactionType}
                          </td>
                          <td style={{ color: colorFun(data.transactionType) }}>
                            {formatTransaction(data.amount, data.transactionType)}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {/* Button to view all */}
                    <tfoot>
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>
                          <button className={styles.viewAllBtn} onClick={handleViewAll}>
                            View All Transactions
                          </button>
                        </td>
                      </tr>
                    </tfoot>

                  </table>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* tab sections */}
      <Tab />
    </>
  );
}

export default Dashboard;



