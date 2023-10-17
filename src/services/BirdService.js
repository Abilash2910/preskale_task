import http from "../http-common";

const getAll = () => {
  return http.get("/birds");
};

const get = (id) => {
  return http.get(`/birds/${id}`);
};

const create = (data) => {
  return http.post("/birds", data);
};

const update = (id, data) => {
  return http.put(`/birds/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/birds/${id}`);
};

const removeAll = () => {
  return http.delete(`/birds`);
};

const findByTitle = (title) => {
  return http.get(`/birds?title=${title}`);
};

const BirdService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default BirdService;