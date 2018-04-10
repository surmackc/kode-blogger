import axios from "axios";

// The getByQuery method retrieves results from the server
// It can accept a "query" that may be a search term or id
export default {
  getAll: function() {
    return axios.get("/notes/read/");
  },

  getActiveUserNotes: function() {
    return axios.get("/notes");
  },

  getById: function(id) {
    return axios.get("/notes/read/" + id);
  },

  publishNote: function(id) {
    return axios.get(`/notes/publish/${id}`);
  },

  unpublishNote: function(id) {
    return axios.get(`/notes/unpublish/${id}`);
  },

  deleteNote: function(id) {
    return axios.delete(`/notes/${id}`);
  },

  getLastNotes: function(amount) {
    return axios.get(`/notes/get/${amount}`);
  }
};
