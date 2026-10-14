import { useCallback, useState } from 'react';
import { get } from '../lib/apiClient';
import type { Plate } from '../types/domain';

interface PlateService {
  getAvailablePlates: () => void;
  plateLoading: boolean;
  platesList: Plate[];
}

function PlateServices(): PlateService {
  const [plateLoading, setPlateLoading] = useState(true);
  const [platesList, setPlatesList] = useState<Plate[]>([]);

  const getAvailablePlates = useCallback(() => {
    setPlateLoading(true);
    void get<Plate[]>('/plates/availables')
      .then((result) => {
        setPlatesList(result.success && Array.isArray(result.body) ? result.body : []);
      })
      .finally(() => setPlateLoading(false));
  }, []);

  return { getAvailablePlates, plateLoading, platesList };
}

export default PlateServices;
