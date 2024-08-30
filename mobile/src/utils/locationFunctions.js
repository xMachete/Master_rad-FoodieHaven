// locationFunctions.js
import * as Location from "expo-location";

export const getPermission = async (setLocation) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Please grant location permission!");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync();
    const locationStr = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
    setLocation(locationStr);
  } catch (err) {
    console.log(err);
  }
};

export const geocode = async (address, setCustomAddress) => {
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

export const reverseGeocode = async () => {
  try {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location[0],
      latitude: location[1],
    });
  } catch (err) {}
};

useEffect(() => {
  getPermission();
}, []);
console.log(`This is location 2: ${location}`);
