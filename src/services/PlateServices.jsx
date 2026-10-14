import { useCallback, useState } from 'react';
import { get } from '../lib/apiClient';

/**
 * PlateServices — hook que busca a lista de pratos disponíveis.
 *
 * CORREÇÃO DO LOOP DE FETCH (antigo bug):
 *   O hook era chamado a cada render e recriava `getAvailablePlates`, que
 *   era listada como dependência do useEffect. Isso gerava um refetch
 *   contínuo a cada estado update (infinite loop) e sobrecarregava a API.
 *
 *   Agora:
 *     - A função é estabilizada com `useCallback` e o useEffect chama
 *       apenas uma vez (condicionalmente, via refetchPlates).
 *     - O fetch é feito via apiClient centralizado, que trata timeouts,
 *       erros HTTP e não deixa stack traces vazar (CWE-209).
 */

function PlateServices() {
  const [plateLoading, setPlateLoading] = useState(true);
  const [platesList, setPlatesList] = useState([]);

  const getAvailablePlates = useCallback(() => {
    setPlateLoading(true);

    get('/plates/availables')
      .then((result) => {
        if (result.success && Array.isArray(result.body)) {
          setPlatesList(result.body);
        } else {
          // Erro de domínio ou resposta inesperada: fail-safe, não quebra a UI.
          setPlatesList([]);
          console.warn('PlateServices: unexpected response', result?.message);
        }
      })
      .catch((err) => {
        console.warn('PlateServices: request failed', err?.message);
        setPlatesList([]);
      })
      .finally(() => setPlateLoading(false));
  }, []);

  return { getAvailablePlates, plateLoading, platesList };
}

export default PlateServices;