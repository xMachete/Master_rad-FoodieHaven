import { useState } from "react";
import axios from "axios";

export function useApi() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (url, method, options) => {
    setIsLoading(true);
    setError(null);

    let response;

    try {
      switch (method) {
        case "GET":
          response = await axios.get(url);
          break;
        case "POST":
          response = await axios.post(url, options);
          break;
        case "PUT":
          response = await axios.put(url, options);
          break;
        case "DELETE":
          response = await axios.delete(url);
          break;
        default:
          setError("Wrong method");
      }

      setData(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, callApi };
}

export default useApi;
