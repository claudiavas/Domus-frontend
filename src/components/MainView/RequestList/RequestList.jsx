import { useEffect, useState } from 'react';
import { RequestCard } from './RequestCard/RequestCard';
import { getActiveRequest } from '../../apiService/apiService';


export function RequestList({ myHousingSwitch }) {
  const [requesting, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("requesting", requesting)

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

  if (!requesting || requesting.length === 0) {
    return <h1>No hay datos de busquedas disponibles.</h1>;
  }

  return (
    <span>
      {requesting.map((request) => (
        //<Link to={`/housingdetails/${house._id}`} key={house._id}>
        <RequestCard
          key={request._id}
          _id={request._id}
          showRealEstateLogo={request.showRealEstateLogo}
          user={request.user}
          title={request.title}
          type={request.type}
          transaction={request.transaction}
          country={request.country}
          province={request.province}
          municipality={request.municipality}
          population={request.population}
          neighborhood={request.neighborhood}
          minM2={request.minM2}
          maxM2={request.maxM2}
          currency={request.currency}
          minPrice={request.minPrice}
          maxPrice={request.maxPrice}
          floorLevel={request.floorLevel}
          facing={request.facing}
          propertyAge={request.propertyAge}
          rooms={request.rooms}
          baths={request.baths}
          garages={request.garages}
          condition={request.condition}
          furnished={request.furnished}
          kitchenEquipment={request.kitchenEquipment}
          closets={request.closets}
          airConditioned={request.airConditioned}
          heating={request.heating}
          elevator={request.elevator}
          outsideView={request.outsideView}
          garden={request.garden}
          pool={request.pool}
          terrace={request.terrace}
          storage={request.storage}
          accessible={request.accessible}
        />
        // </Link>
      ))}
  
    </span>
  );
}
