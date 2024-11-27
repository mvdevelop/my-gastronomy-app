
/* eslint-disable react/prop-types */

import { Dialog } from '@mui/material';
import styles from './PlatePopup.module.css';

function PlatePopup({ plateData, onClose, onAddToCart }) {
  return (
    <Dialog open={true} onClose={onClose}>
        <div className={styles.popupContainer}>
            <img src={plateData.imgUrl} alt="" />
            <div className={styles.popupContent}>
                <h2>{plateData.name}</h2>
                <p>{plateData.description}</p>
                <h3>$ {plateData.price}</h3>
                <button onClick={() => { onAddToCart(plateData) }}>
                  Add to Cart
                </button>
            </div>
        </div>
    </Dialog>
  )
}

export default PlatePopup;
