import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer QfbDarnyg0zkDMd1cAeyU9Ppx1lpxf0docC37iIaO5TQw9iCui_t6pq2IdOAwZx6E49YOiKXrKyhCJZwKNeroK-nvj-ve5To6xRAZZlHmd106BDOCn_iPuOlN4pRZHYx",
  },
});
