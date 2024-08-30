import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import useApi from "../hooks/useApi";
import Constants from "expo-constants";

const ReservationScreen = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { data: responseData, error, isLoading, callApi } = useApi();

  const localIp = Constants.expoConfig?.hostUri?.split(":").shift();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const onSubmit = () => {
    const reservation = {
      restaurantId: route.params.restaurantId,
      tableNumber: tableNumber,
      email: email,
      date: date,
      time: time,
      name: name,
    };

    callApi(`http://${localIp}:4000/reservations/create`, "POST", reservation);

    setTableNumber("");
    setEmail("");
    setDate(new Date());
    setTime(new Date());
    setName("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Icon
          name="calendar"
          size={28}
          color="#333"
          style={styles.headingIcon}
        />
        <Text style={styles.heading}>Make a Reservation</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Table number"
        keyboardType="numeric"
        value={tableNumber}
        onChangeText={setTableNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
        <Icon name="calendar" size={20} color="#333" style={styles.inputIcon} />
        <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <TouchableOpacity onPress={showTimepicker} style={styles.dateButton}>
        <Icon name="clock-o" size={20} color="#333" style={styles.inputIcon} />
        <Text style={styles.dateButtonText}>
          {time
            .toLocaleTimeString()
            .split(":")
            .filter((el, index) => index !== 2)
            .join(":")}
          {new Date().getHours() < 12 ? " AM" : " PM"}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={onSubmit}
        disabled={isLoading || responseData?.message === "OK"}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Submitting..." : "Submit"}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      {responseData?.message === "OK" && (
        <Text style={styles.reserved}>
          Reservation successful! Please confirm it on email.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // Light background color
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  headingIcon: {
    marginRight: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Darker text color
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: "#fff", // White background for input
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  dateButton: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  dateButtonText: {
    fontSize: 18,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF", // Blue background color
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  buttonText: {
    fontSize: 18,
    color: "#fff", // White text color
    fontWeight: "bold",
  },
  reserved: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ReservationScreen;
