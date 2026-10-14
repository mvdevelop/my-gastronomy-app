import { Dialog } from '@mui/material';
import styles from './PlatePopup.module.css';
import type { Plate } from '../types/domain';

interface PlatePopupProps {
  plateData: Plate;
  onClose: () => void;
  onAddToCart: (plate: Plate) => void;
}

function PlatePopup({ plateData, onClose, onAddToCart }: PlatePopupProps) {
  return (
    <Dialog open onClose={onClose} aria-labelledby="plate-dialog-title">
      <div className={styles.popupContainer}>
        <img src={plateData.imgUrl} alt={plateData.name} />
        <div className={styles.popupContent}>
          <h2 id="plate-dialog-title">{plateData.name}</h2>
          <p>{plateData.description}</p>
          <h3>$ {plateData.price}</h3>
          <button type="button" onClick={() => onAddToCart(plateData)}>
            Add to Cart
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default PlatePopup;
