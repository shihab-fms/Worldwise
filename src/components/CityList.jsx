/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCity();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message='Add your first city by cliking on the map' />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
