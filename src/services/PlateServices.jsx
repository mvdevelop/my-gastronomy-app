
import { useState } from "react";

function PlateServices() {
    const [ plateLoading, setPlateLoading ] = useState(false);
    const [ refetchPlates, setRefetchPlates ] = useState(true);
    const [ platesList, setPlatesList ] = useState([]);

    // const url = 'http://localhost:3000/plates';

    const url = 'https://my-gastronomy-backend.vercel.app/plates';

    const getAvailablePlates = () => {
        setPlateLoading(true);

        fetch(`${url}/availables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then((response) => response.json())
        .then((result) => { 
            if(result.success) {
                setPlatesList(result.body);
            } else {
                console.log(result); 
            }
        })
        .catch((error) => console.log(error))
        .finally(() => { 
            setPlateLoading(false);
            setRefetchPlates(false); 
        });
    }

    return { getAvailablePlates, plateLoading, refetchPlates, platesList }
}

export default PlateServices;
