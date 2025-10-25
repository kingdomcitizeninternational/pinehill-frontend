import React, { useState, useEffect } from 'react';
import styles from './CardForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Loader from '../components/Modal/LoadingModal';
import Modal from '../components/Modal/Modal';
import { deleteCard } from '../store/action/userAppStorage';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { useNavigate, useParams } from 'react-router-dom';

function CardDetails() {
    let [isInfo, setIsInfo] = useState(false);
    let [isLoading, setIsLoading] = useState(false);
    let [card, setIsCard] = useState(null);
    let [isError, setIsError] =  useState(false);
    let [isErrorInfo, setIsErrorInfo] = useState('');
    let [isConfirm, setIsConfirm] = useState(false);
    let { user, accounts, cards } = useSelector(state => state.userAuth);
    let [nameOnCard, setNameOnCard] = useState(`${user.firstName} ${user.lastName}`);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        try {
            if (!cards || !id) throw new Error("Cards or ID not found");
            let foundCard = cards.find(data => data._id === id);
            if (!foundCard) throw new Error("Card not found");
            setIsCard(foundCard);
        } catch (error) {
            console.error("Error loading card:", error);
            alert(`Error loading card: ${error.message}`);
            setIsError(true);
            setIsErrorInfo(error.message);
        }
    }, [cards, id]);

    let deleteHandler = async (id) => {
        try {
            setIsLoading(true);
            let response = await dispatch(deleteCard(id));
            if (!response.bool) {
                setIsLoading(false);
                setIsError(true);
                setIsErrorInfo(response.message || "Delete failed");
                return;
            }
            setIsLoading(false);
            navigate('/card');
        } catch (error) {
            console.error("Delete card error:", error);
            alert(`Delete card error: ${error.message}`);
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(error.message);
        }
    };

    let newCardHandler = () => navigate('/new-card-form');
    let changeHandler = () => setIsInfo(prev => !prev);
    let closeModal = () => setIsError(false);

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            <div className={styles.screenContainer}>
                <SideBar active='Card' />
                <div className={styles.maindashboard} style={{ height: '100vh' }}>
                    <Header home={false} title={'Detail'} />
                    <div className={styles.mainscreen}>
                        {card && card.isVerified && (
                            <div className={styles.mainscreenright}>
                                <div className={styles.cardContainer}>
                                    <Cards
                                        number={card.cardNumber}
                                        expiry={card.expiry}
                                        cvc={card.cvv}
                                        name={card.nameOnCard}
                                        className={styles.card}
                                    />
                                </div>
                                <form className={styles.form}>
                                    <div className={styles.formbody}>
                                        <p>Card type</p>
                                        <input value={card.cardType} required readOnly />

                                        <p>Name on Card</p>
                                        <input value={card.nameOnCard} required readOnly />

                                        <p>Card Number</p>
                                        <input value={card.cardNumber} required readOnly />

                                        <p>Cvv</p>
                                        <input value={card.cvv} required readOnly />

                                        <p>Expiry</p>
                                        <input value={card.expiry} required readOnly />

                                        <p>Balance</p>
                                        <input value={card.Balance} required readOnly />

                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            deleteHandler(card._id);
                                        }}>Delete Card</button>

                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            newCardHandler();
                                        }}>New Card</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardDetails;
