import { useSelector } from "react-redux";
import styles from "./Transfer.module.css";


let TransferModal = ({ closeFavorite }) => {
    let { user, color } = useSelector(state => state.userAuth)

    return <div className={styles.favoriteListCard}>
        <div className={styles.favoriteCard}>
            
            <div className={styles.body}>
                
                <button onClick={()=>closeFavorite('myBank')} className={styles.transferbutton}>Transfer within my accounts</button>
                <button onClick={()=>closeFavorite('otherBank')} className={styles.transferbutton}>Transfer to other bank</button>



            </div>



        </div>

    </div>
}

export default TransferModal