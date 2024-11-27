
import './Plates.module.css';

import { useEffect, useState } from 'react';
import PlateServices from '../services/PlateServices';
import Loading from './Loading';
import PlateCard from '../components/PlateCard';
import styles from './Plates.module.css';
import PlatePopup from '../components/PlatePopup';
import { UseCartContext } from '../contexts/UseCartContext';

function Plates() {

  const { getAvailablePlates, platesList, plateLoading, refetchPlates } = PlateServices();
  const [ plateSelected, setPlateSelected ] = useState(null);
  const { addToCart } = UseCartContext();

  useEffect(() => {
    if(refetchPlates) {
      getAvailablePlates();
    }
  }, [getAvailablePlates, refetchPlates]);

  const handlePlateSelected = (plate) => {
    setPlateSelected(plate);
  }

  const handleClosePopup = () => {
    setPlateSelected(null);
  }

  const handleAddToCart = (itemToAdd) => {
    addToCart(itemToAdd);
    handleClosePopup();
  }

  if(plateLoading) {
    return(<Loading />)
  }

  console.log(platesList);

  return (
    <>
      <div className={styles.platesContainer}>
        {platesList.map((plate) => (
          <div key={plate._id} className={styles.cardContainer} onClick={() => { handlePlateSelected(plate) }}>
            <PlateCard className={styles.plate} plateData={plate} />
          </div>
        ))}
      </div>

      {plateSelected && (
        <>
          <PlatePopup 
            plateData={plateSelected} 
            onClose={handleClosePopup}
            onAddToCart={handleAddToCart}
          />
        </>
      )}

    </>
  )
}

export default Plates;
