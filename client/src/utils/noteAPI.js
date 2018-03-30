import axios from "axios";

// The getByQuery method retrieves results from the server
// It can accept a "query" that may be a search term or id
export default {
  getAll: function() {
    return axios.get("/notes/read/");
  },

  getById: function(id) {
    return axios.get("/notes/read/" + id);
  }
};
