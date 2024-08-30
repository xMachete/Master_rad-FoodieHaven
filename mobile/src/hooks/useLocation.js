import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default () => {
  const [userLocation, setUserLocation] = useState([]);

  const [customAddress, setCustomAddress] = useState([]);
  const [distance, setDistance] = useState(10);

  // getting permison and address
  const getPermission = async (setUserLocation) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Please grant location permission!");
        return;
      }
      console.log(status);

      let currentLocation = await Location.getCurrentPositionAsync();

      setUserLocation([
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  //from string to lat and long
  const geocode = async (address) => {
    try {
      const geocodedLocation = await Location.geocodeAsync(address);

      setCustomAddress([
        geocodedLocation[0].latitude,
        geocodedLocation[0].longitude,
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  //from long and lat to full address
  const reverseGeocode = async () => {
    try {
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: location[0],
        latitude: location[1],
      });
    } catch (err) {}
  };
  useEffect(() => {
    getPermission(setUserLocation);
  }, []);

  return [userLocation, customAddress, distance, geocode];
};
