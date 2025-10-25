import React from 'react'
import styles from './SuccessModal.module.css';



let SuccessModal = ({ data, closeFavorite }) => {

    return <div className={styles.favoriteListCard}>
        <div className={styles.favoriteCard}>

            <div className={styles.loaderContainer}>

                <div className='loaders'>
                    <div className='loader-inner'>
                        <div className='loader-inner-inner'>
                            <span className='material-icons'>check</span>
                        </div>
                    </div>
                </div>


            </div>


            <div className={styles.body}>
                <h5>${data.amount} transferred successful</h5>
                <p> The transfer has been credited to {data.accountName} account</p>
                
            </div>

            <button onClick={closeFavorite}>got it!</button>
        </div>

    </div>
}

export default SuccessModal
