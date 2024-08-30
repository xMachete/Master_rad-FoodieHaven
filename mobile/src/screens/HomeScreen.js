import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>Search fast, enjoy the best!</Text>
        <Text style={styles.tagline}>Find the best restaurants near you!</Text>

        <Image
          source={require("../../assets/logo2.png")}
          style={styles.iconImage}
        />

        <Button
          onPress={() => {
            navigation.navigate("Search");
          }}
          title="Search Restaurants"
          color="#FF6347"
        />

        <View style={styles.buttonSpacing}>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => {
              navigation.navigate("QRCodeScanner");
            }}
          >
            <Icon name="qrcode-scan" size={30} color="white" />
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333333",
  },
  tagline: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  iconImage: {
    width: 100,
    height: 130,
    marginBottom: 20,
    cover: "contain",
  },
  buttonSpacing: {
    marginTop: 30,
  },
  qrButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
});
