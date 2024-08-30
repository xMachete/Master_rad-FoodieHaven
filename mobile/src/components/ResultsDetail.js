import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import useLocation from "../hooks/useLocation";
import haversineDistance from "../utils/haversineDistance";
import Constants from "expo-constants";

// This components shows as result detail in the result list
const ResultsDetail = ({ result }) => {
  const [userLocation] = useLocation();

  const localIp = Constants.expoConfig?.hostUri?.split(":").shift();
  if (localIp.startsWith("192")) {
    result.image_url = result.image_url.replace("localhost", localIp);
  }
  const distance = parseInt(
    haversineDistance(
      userLocation[0],
      userLocation[1],
      result.coordinates.latitude,
      result.coordinates.longitude
    )
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: result.image_url }}
        alt="photo"
      />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {result.rating} Stars, {result.review_count} Reviews
        {distance ? `, ${distance} km` : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
});

export default ResultsDetail;
