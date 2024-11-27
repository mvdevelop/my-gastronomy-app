
/* eslint-disable react/prop-types */

import styles from './PlateCard.module.css';

function PlateCard({ plateData }) {
  return (
    <>
        <div className={styles.cardContainer}>
            <img src={plateData.imgUrl} alt="" />
            <div className={styles.cardContent}>
                <h3>{plateData.name}</h3>
                <p className={styles.ingredients}>{String(plateData.ingredients)}</p>
                <h3 className={styles.price}>
                  $ {plateData.price}
                </h3>
            </div>
        </div>
    </>
  )
}

export default PlateCard;
