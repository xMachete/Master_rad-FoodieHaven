import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const searchApi = async (searchTerm) => {
    try {
      setLoading(true);

      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results,, isLoading, errorMessage];
};
