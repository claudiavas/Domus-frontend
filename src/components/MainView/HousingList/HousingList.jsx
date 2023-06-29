import { useContext, useEffect, useState } from 'react';
import HouseCard from './Card/HouseCard';
import { getActiveHousing } from '../../apiService/apiService';
import HousingContext from '../../FilterHousing/HousingContextFilter';
//import { RoomFilter } from '../../FilterHousing';
//import { Link } from 'react-router-dom';

export function HousingList() {
  const [housing, setHousing] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("housing", housing)
  const {room} = useContext(HousingContext);

  const fetchHousing = async () => {
    try {
      const data = await getActiveHousing();
      setHousing(data);
      setLoading(false); // Indicar que la carga ha finalizado
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      setLoading(false); // Indicar que la carga ha finalizado (incluso en caso de error)
    }
  };

  useEffect(() => {
    fetchHousing();
  }, []);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (!housing || housing.length === 0) {
    return <h1>No hay datos de viviendas disponibles.</h1>;
  }

return (
  <>
  <div>
    
    {housing
      .filter((house) => {
        if (room && room !== '') {
          return house.rooms === parseInt(room);
        }
        return true;
      })
      .map((house) => (
        <HouseCard
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
        />
        // </Link>
      ))}
  </div>
  </>
);

}
