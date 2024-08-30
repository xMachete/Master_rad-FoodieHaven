import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import haversineDistance from "../utils/haversineDistance";
import useLocation from "../hooks/useLocation";
import useApi from "../hooks/useApi";
import Constants from "expo-constants";
import Loader from "../components/Loader";
import { isNumeric } from "../utils/helper";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  // const [searchApi, results, isLoading, errorMessage] = useResults();
  const { data: results, isLoading, error: errorMessage, callApi } = useApi();
  //restaurant results to display
  const [res, setRes] = useState([]);
  const [showDistanceInput, setShowDistanceInput] = useState(false);
  const [distance, setDistance] = useState(10150);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const uri =
    Constants.expoConfig?.hostUri?.split(":").shift()?.concat(":4000") ??
    "yourapi.com";

  // const navigation = useNavigation();
  useEffect(() => {
    setRes([...results]);
  }, [results]);

  const [userLocation] = useLocation();

  useEffect(() => {
    callApi(`http://${uri}/restaurants/getAll`, "GET");
  }, []);

  // filter by price
  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$'

    return res.filter((result) => {
      return result.price === price;
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  // Toggle filters
  const removeFilters = () => {
    setRes(results);
    setDistance("");
    setFiltersApplied(false);
  };
  // filter by location
  const filterResultsByLocation = (distance) => {
    return results.filter((result) => {
      return (
        haversineDistance(
          userLocation[0],
          userLocation[1],
          result.coordinates.latitude,
          result.coordinates.longitude
        ) <= distance
      );
    });
  };

  const takeFilters = async () => {
    const newResults = await filterResultsByLocation(distance);
    setRes(newResults);
    setFiltersApplied(true);
  };

  const onTermSubmit = (term) => {
    if (term === "") {
      setRes(results);
      return;
    }
    setRes((res) => {
      // if previously filtered with no match, reset to all results
      if (res.length === 0) {
        res = results;
      }
      return res.filter((r) => {
        const foundByName =
          r.name.toLowerCase().search(term.toLowerCase()) >= 0;
        const foundByCategory = r.category
          .split(",")
          .map((el) => el.trim().toLowerCase())
          .includes(term.toLowerCase());

        return foundByCategory || foundByName;
      });
    });
  };

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        // onTermSubmit={() => searchApi(term)}
        onTermSubmit={() => onTermSubmit(term)}
      />
      <ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title={showDistanceInput ? "Hide Filters" : "Show Filters"}
            onPress={() => setShowDistanceInput(!showDistanceInput)}
          />
          {showDistanceInput && (
            <Button
              style={styles.button}
              title={filtersApplied ? "Remove Filters" : "Apply Filters"}
              onPress={filtersApplied ? removeFilters : takeFilters}
              disabled={!isNumeric(distance) || distance === ""}
            />
          )}
        </View>

        {showDistanceInput && (
          <View style={styles.distanceInput}>
            <Text style={styles.distanceText}>
              Enter maximum distance (km):{" "}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="10"
              value={distance}
              onChangeText={setDistance}
            />
          </View>
        )}
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        {res?.length > 0 ? (
          <>
            <ResultsList
              results={filterResultsByPrice("$")}
              title="Cost Effective"
            />
            <ResultsList
              results={filterResultsByPrice("$$")}
              title="Bit Pricier"
            />
            <ResultsList
              results={filterResultsByPrice("$$$")}
              title="Big Spender"
            />
          </>
        ) : (
          <Text style={styles.noResults}>No results.</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  noResults: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 32,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10, // for some padding on the left
    paddingRight: 10, // for some padding on the right
    borderRadius: 5, // for rounded corners
    marginVertical: 10, // some space on top and bottom
    fontSize: 16, // adjust as required
  },
  distanceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10, // to provide some spacing above and below the text
  },
  //... (any other styles you have in this object)

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  distanceInput: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15,
  },

  button: {
    flex: 1, // ensures the buttons take up equal width within the container
    marginHorizontal: 5, // spaces the buttons apart
  },
});

export default SearchScreen;
