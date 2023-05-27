import { useEffect, useState } from 'react';
import HouseCard from './Card/HouseCard';
import { getAllHousing } from '../../apiService/apiService';

function HousingList() {
  const [housing, setHousing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHousing = async () => {
    try {
      const data = await getAllHousing();
      setHousing({data});
      console.log("data en fetch", data)
      console.log("housing en fetch", housing)

    } catch (error) {
      // Manejar el error aquí
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHousing();
  }, []);

  if (!housing || housing.length === 0) {
    return <h1>No hay datos de viviendas disponibles.</h1>;
  }

  return (
    <span>
      {housing.map((house) => (
        <HouseCard
          key={house._id}
          housing={housing}
          _id={house._id}
          house={house.description}
          province={house.province}
          municipality={house.municipality}
          population={house.population}
          neighborhood={house.neighborhood}
          currency={house.currency}
          price={house.price}
          square_meters={house.square}
          description={house.description}
          rooms={house.rooms}
          baths={house.baths}
        />
      ))}
    </span>
  );
}

export default HousingList;