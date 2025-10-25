import styles from './Fallback.module.css';


const Fallback = () => {
    return (<div className={styles.container}>
        <div>
            <img src={"../../assets/img/bank_logo.png"} alt="Bank Logo" width={'200px'} className={styles.logo} />
        </div>
    </div>)
}

export default Fallback