// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import useApi from "../hooks/useApi";
// import Constants from "expo-constants";

// const ReviewScreen = ({ route }) => {
//   const [name, setName] = useState("");
//   const [comment, setComment] = useState("");
//   const [stars, setStars] = useState(0);
//   const { data: responseData, isLoading, error, callApi } = useApi();
//   const { restaurantId } = route.params;

//   const localIp = Constants.expoConfig?.hostUri?.split(":").shift();

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     callApi(`http://${localIp}:4000/reviews/create`, "POST", {
//       restaurantId,
//       name,
//       comment,
//       stars,
//     });
//   };

//   console.log("responseData", responseData);
//   console.log("error", error);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Leave a Review</Text>
//       <View style={styles.form}>
//         <Text style={styles.label}>Name:</Text>
//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           placeholder="Enter your name"
//         />
//         <Text style={styles.label}>Comment:</Text>
//         <TextInput
//           style={styles.textarea}
//           value={comment}
//           onChangeText={setComment}
//           placeholder="Enter your comment"
//           multiline
//         />
//         <Text style={styles.label}>Stars:</Text>
//         <View style={styles.starContainer}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <TouchableOpacity key={star} onPress={() => setStars(star)}>
//               <Text style={[styles.star, star <= stars && styles.selectedStar]}>
//                 ★
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <Button
//           title={isLoading ? "Submitting..." : "Submit"}
//           onPress={handleSubmit}
//           disabled={isLoading || responseData?.message === "OK"}
//         />
//         {error && <Text style={styles.error}>{error}</Text>}
//         {responseData?.message === "OK" && (
//           <Text style={styles.reserved}>Thank you for the feedback!</Text>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f9f9f9",
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   form: {
//     width: "100%",
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 18,
//   },
//   input: {
//     padding: 10,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     width: "100%",
//     marginBottom: 15,
//   },
//   textarea: {
//     padding: 10,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     width: "100%",
//     height: 100,
//     marginBottom: 15,
//   },
//   starContainer: {
//     flexDirection: "row",
//     marginBottom: 15,
//   },
//   star: {
//     fontSize: 24,
//     color: "#ccc",
//     marginRight: 5,
//   },
//   selectedStar: {
//     color: "#FFD700",
//   },
//   reserved: {
//     fontSize: 18,
//     color: "green",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   error: {
//     fontSize: 18,
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default ReviewScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import useApi from "../hooks/useApi";

const ReviewScreen = ({ route }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const { data: responseData, isLoading, error, callApi } = useApi();
  const { restaurantId } = route.params;

  const localIp = Constants.expoConfig?.hostUri?.split(":").shift();

  const handleSubmit = () => {
    // Handle form submission logic here
    callApi(`http://${localIp}:4000/reviews/create`, "POST", {
      restaurantId,
      name,
      comment,
      stars,
    });
  };

  console.log("responseData", responseData);
  console.log("error", error);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Review</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <Text style={styles.label}>Comment:</Text>
        <TextInput
          style={styles.textarea}
          value={comment}
          onChangeText={setComment}
          placeholder="Enter your comment"
          multiline
        />
        <Text style={styles.label}>Stars:</Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setStars(star)}>
              <Text style={[styles.star, star <= stars && styles.selectedStar]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          title={isLoading ? "Submitting..." : "Submit"}
          onPress={handleSubmit}
          disabled={isLoading || responseData?.message === "OK"}
          color="#6200EE"
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {responseData?.message === "OK" && (
          <Text style={styles.success}>Thank you for the feedback!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  star: {
    fontSize: 30,
    color: "#ccc",
    marginHorizontal: 5,
  },
  selectedStar: {
    color: "#FFD700",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  success: {
    color: "green",
    fontSize: 18,
    marginTop: 15,
    alignContent: "center",
    textAlign: "center",
  },
});

export default ReviewScreen;
