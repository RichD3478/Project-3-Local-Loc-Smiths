import axios from "axios";

export default {
  getLocssmiths: function() {
    return axios.get("/api/locsSmiths");
  },
  getLocsSmiths: function(id) {
    return axios.get("/api/locsSmiths/" + id);
  },
  delete: function(id) {
    return axios.delete("/api/locsSmiths/" + id);
  },
  saveLocsSmith: function(bookData) {
    return axios.post("/api/locsSmiths", locsSmithData);
  }
};