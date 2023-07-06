import { useEffect, useState } from 'react';
import { RequestCard } from './RequestCard/RequestCard';
import { getActiveHousing } from '../../apiService/apiService';
import { RequestCard } from './RequestCard/RequestCard';
//import { Link } from 'react-router-dom';

export function RequestList() {
  const [requesting, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("housing", housing)

  const fetchRequest = async () => {
    try {
      const data = await getActiveRequest();
      setRequest(data);
      setLoading(false); // Indicar que la carga ha finalizado
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      setLoading(false); // Indicar que la carga ha finalizado (incluso en caso de error)
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (!request || request.length === 0) {
    return <h1>No hay datos de busquedas disponibles.</h1>;
  }

  return (
    <span>
      {request.map((house) => (
        //<Link to={`/housingdetails/${house._id}`} key={house._id}>
        <RequestCard
          key={house._id}
          _id={house._id}
          house={house.description}
          province={house.province}
          municipality={house.municipality}
          population={house.population}
          neighborhood={house.neighborhood}
          currency={house.currency}
          price={house.price}
          squareMeters={house.squareMeters}
          description={house.description}
          rooms={house.rooms}
          baths={house.baths}
          transaction={house.transaction}
          type={house.type}
          furnished={house.furnished}
          garages={house.garages}
        />
        // </Link>
      ))}
    </span>
  );
}
