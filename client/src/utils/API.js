import axios from "axios";

// The getByQuery method retrieves results from the server
// It can accept a "query" that may be a search term or id
export default {
  getAll: function() {
    return axios.get("/api");
  },

  getByQuery: function(query) {
    return axios.get("/api", { params: { q: query } });
  }
};
