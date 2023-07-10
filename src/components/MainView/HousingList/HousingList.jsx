import { useContext, useEffect, useState } from 'react';
import HouseCard from './Card/HouseCard';
import { getActiveHousing } from '../../apiService/apiService';
import HousingContext from '../../FilterHousing/HousingContextFilter';
//import { RoomFilter } from '../../FilterHousing';
//import { Link } from 'react-router-dom';

export function HousingList() {
  const [housing, setHousing] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("housing", housing);
  const { meter, room, baths, garage, minPrice, maxPrice, checkbox } = useContext(HousingContext);

  const housingFiltrado = housing.filter((house) => {
    // Aplicar el filtro de habitaciones y metros cuadrados
    
    const cumpleFiltroHabitaciones = room ? house.rooms === parseInt(room) : true;
    const cumpleFiltroMetrosCuadrados = house.squareMeters >= meter;
    const cumpleFiltroBaths = baths ? house.baths === parseInt(baths) : true;
    const cumpleFiltroGarage = garage ? house.garages === parseInt(garage) : true;
    const cumpleFiltroMinPrice = house.price >= minPrice;
    const cumpleFiltroMaxPrice = house.price <= maxPrice;
    const cumpleFiltroCheckbox =  (!checkbox.closet || house.closet) &&
    (!checkbox.air_condicioned || house.air_condicioned) &&
    (!checkbox.heating || house.heating) &&
    (!checkbox.elevator || house.elevator) &&
    (!checkbox.outside_view || house.outside_view) &&
    (!checkbox.garden || house.garden) &&
    (!checkbox.pool || house.pool) &&
    (!checkbox.terrace || house.terrace) &&
    (!checkbox.storage || house.storage) &&
    (!checkbox.accessible || house.accessible);

    return cumpleFiltroHabitaciones &&  cumpleFiltroMetrosCuadrados && cumpleFiltroBaths && cumpleFiltroGarage && cumpleFiltroMinPrice  && cumpleFiltroMaxPrice && cumpleFiltroCheckbox;
  });

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
    <div>
      {/* Renderizar los elementos filtrados */}
      {housingFiltrado.map((house) => (
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
          garages={house.garages}
          
        />
      ))}
    </div>







    // <>
    // <div>

    //   {housing
    //     .filter((house) => {
    //       if (room && room !== '') {
    //         return house.rooms === parseInt(room);
    //       }
    //       return true;
    //     })
    //     .map((house) => (
    //       <HouseCard
    //         key={house._id}
    //         _id={house._id}
    //         house={house.description}
    //         province={house.province}
    //         municipality={house.municipality}
    //         population={house.population}
    //         neighborhood={house.neighborhood}
    //         currency={house.currency}
    //         price={house.price}
    //         squareMeters={house.squareMeters}
    //         description={house.description}
    //         rooms={house.rooms}
    //         baths={house.baths}
    //       />
    //       // </Link>
    //     ))}
    // </div>
    // </>
  );

}
