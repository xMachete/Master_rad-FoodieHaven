import { Text, Button, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

import { TextInput } from "react-native-gesture-handler";
import useLocation from "../hooks/useLocation";

export default function LocationScreen() {
  const [address, setAddress] = useState();
  const [customAddress, geocode] = useLocation();

  return (
    <>
      <Text>Enter some place: </Text>
      <TextInput
        placeholder="address"
        value={address}
        onChangeText={setAddress}
      ></TextInput>
      <Button title="Show coordinates" onPress={() => geocode(address)} />
      {customAddress[0] ? (
        <Text>{`Latitude: ${customAddress[0]}, Longitude: ${customAddress[1]}`}</Text>
      ) : null}
      <ScrollView></ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
