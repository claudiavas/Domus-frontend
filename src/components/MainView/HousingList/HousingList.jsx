import { useContext } from 'react';
import HouseCard from './Card/HouseCard';
import { HousingContext } from '../../Contexts/HousingContext';
import { AuthContext } from '../../Contexts/AuthContext';
import HousingContextFilter from '../../FilterHousing/HousingContextFilter';
//import { RoomFilter } from '../../FilterHousing';
//import { Link } from 'react-router-dom';

export function HousingList({myHousingSwitch}) {
  
  console.log("myHousingSwitch", myHousingSwitch);
  const { housing } = useContext(HousingContext);
  console.log("Los datos de Housing son:", housing)
  const { profile } = useContext(AuthContext);
  const { meter, room, baths, garage, minPrice, maxPrice, checkbox, province } = useContext(HousingContextFilter)
  const housingFiltrado = housing.filter((house) => {
  
    // Aplicar el filtro de habitaciones y metros cuadrados
    const myHousingFilter = myHousingSwitch ? house.user._id === profile._id : true;
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
    const cumpleFiltroProvince = province ? (house.province === province) : true;


    return myHousingFilter  && cumpleFiltroHabitaciones &&  cumpleFiltroMetrosCuadrados && cumpleFiltroBaths && cumpleFiltroGarage && cumpleFiltroMinPrice  && cumpleFiltroMaxPrice && cumpleFiltroCheckbox && cumpleFiltroProvince;
  });


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
          title={house.title}
          rooms={house.rooms}
          baths={house.baths}
          transaction={house.transaction}
          type={house.type}
          furnished={house.furnished}
          garages={house.garages}
          images={house.images}
          showRealEstateLogo={house.showRealEstateLogo}
          user={house.user}
          userId={house.user._id}
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
