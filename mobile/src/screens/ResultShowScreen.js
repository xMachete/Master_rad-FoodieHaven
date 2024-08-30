import yelp from "../api/yelp";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Linking } from "react-native";
import tableLayout from "../../assets/tableLayout.png";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

const ResultDetailScreen = ({ route }) => {
  // const [result, setResult] = useState(null);
  const localIp = Constants.expoConfig?.hostUri?.split(":").shift();
  const { result } = route.params;

  if (localIp.startsWith("192")) {
    result.photos = result.photos.map((photo) =>
      photo.replace("localhost", localIp)
    );
  }
  if (!result) {
    return null;
  }

  const navigation = useNavigation();
  const layoutUri = result.photos.find((photo) =>
    photo.toLowerCase().includes("layout")
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{result.name}</Text>
        <Button
          title="Book table"
          onPress={() =>
            navigation.navigate("Reservation", { restaurantId: result._id })
          }
        ></Button>
      </View>
      <FlatList
        style={{ height: 100 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          if (item === layoutUri) return null;
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
      <Image
        style={styles.tableLayout}
        source={{ uri: layoutUri }}
        alt="layoutPhoto"
      ></Image>
      <Text style={styles.rating}>
        Rating: {result.rating} ({result.review_count} reviews)
      </Text>
      <Text style={styles.category}>
        {/* {result.categories.map((cat) => cat.title).join(", ")} */}
        {result.categories}
      </Text>
      <Text style={styles.price}>{result.price}</Text>
      <Text style={styles.address}>
        {/* {result.location.display_address.join(", ")} */}
        {result.location}
      </Text>
      <Text
        style={styles.phone}
        onPress={() => Linking.openURL(`tel:${result.phone}`)}
      >
        {result.display_phone}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  tableLayout: {
    resizeMode: "contain",
    height: 280,
    width: 325,
    margin: 5,
  },
  header: {
    flexDirection: "row", // Horizontal layout
    justifyContent: "space-between", // Space evenly
    alignItems: "center", // Align vertically in the center
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 4,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  category: {
    fontSize: 16,
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  address: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
  phone: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default ResultDetailScreen;
