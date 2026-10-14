import styles from './PlateCard.module.css';
import type { Plate } from '../types/domain';

interface PlateCardProps {
  plateData: Plate;
}

function PlateCard({ plateData }: PlateCardProps) {
  return (
    <div className={styles.cardContainer}>
      <img src={plateData.imgUrl} alt={plateData.name || 'Dish'} loading="lazy" />
      <div className={styles.cardContent}>
        <h3>{plateData.name}</h3>
        <p className={styles.ingredients}>{String(plateData.ingredients ?? '')}</p>
        <h3 className={styles.price}>$ {plateData.price}</h3>
      </div>
    </div>
  );
}

export default PlateCard;
