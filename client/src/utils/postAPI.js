import axios from "axios";

// The getByQuery method retrieves results from the server
// It can accept a "query" that may be a search term or id
export default {
  getAll: function() {
    return axios.get("/posts/read/");
  },

  getActiveUserPosts: function() {
    return axios.get("/posts");
  },

  createPost: function(post) {
    return axios.post("/posts", post);
  },

  updatePost: function(post) {
    return axios.put(`/notes/update/${this.state.noteId}`, post);
  },

  getById: function(id) {
    return axios.get(`/posts/${id}`);
  },

  publishNote: function(id) {
    return axios.get(`/posts/publish/${id}`);
  },

  unpublishNote: function(id) {
    return axios.get(`/posts/unpublish/${id}`);
  },

  deleteNote: function(id) {
    return axios.delete(`/posts/${id}`);
  },

  getLastPosts: function(amount) {
    return axios.get(`/posts/get/${amount}`);
  }
};