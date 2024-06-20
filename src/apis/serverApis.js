import apiRequest from "../../lib/apiRequest";
export const createUserOrAdmin = async (credentials) => {
  const res = await apiRequest.post("/register", {
    credentials,
  });
  // console.log(res);
  return res;
};

export const LogIn = async (credentials) => {
  const res = await apiRequest.post("/login", credentials);
  // console.log(res);
  return res;
};

export const newCollection = async (credentials) => {
  const res = await apiRequest.post("/collection/new", credentials, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // console.log(res);
  return res;
};

export const getCollections = async () => {
  const res = await apiRequest.get("/collections");
  // console.log(res);
  return res;
};

export const getCollection = async (id) => {
  const res = await apiRequest.get(`/collection/edit/${id}`);
  // console.log(res);
  return res;
};

export const getAllCollections = async (id) => {
  const res = await apiRequest.post("/all-collections", { name: id });
  // console.log(res);
  return res;
};

export const editCollection = async (credentials) => {
  const res = await apiRequest.patch("/collection/edit", credentials, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // console.log(res);
  return res;
};

export const deleteCollection = async (credentials) => {
  const res = await apiRequest.delete("/collection/delete", {
    data: credentials,
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(res);
  return res;
};

export const newItem = async (credentials) => {
  const res = await apiRequest.post("/item/new", credentials);
  // console.log(res);
  return res;
};

export const getItems = async (id) => {
  const res = await apiRequest.post("/items", { Id: id });
  // console.log(res);
  return res;
};

export const deleteItem = async (credentials) => {
  const res = await apiRequest.delete("/item/delete", {
    data: credentials,
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(res);
  return res;
};

export const getEditItem = async (id) => {
  const res = await apiRequest.get(`/item/edit/${id}`);
  // console.log(res);
  return res;
};

export const editItem = async (credentials) => {
  const res = await apiRequest.patch("/item/edit", credentials);
  // console.log(res);
  return res;
};

export const getItem = async (id) => {
  const res = await apiRequest.get(`/item/${id}`);
  // console.log(res);
  return res;
};

export const getLatItms = async () => {
  const res = await apiRequest.get("/latestitems");
  // console.log(res);
  return res;
};

export const getLarColl = async () => {
  const res = await apiRequest.get("/LargestCollections");
  // console.log(res);
  return res;
};

export const updateLike = async (credentials) => {
  const res = await apiRequest.post("/like", credentials);
  // console.log(res);
  return res;
};

export const newComment = async (credentials) => {
  const res = await apiRequest.post("/newComment", credentials);
  // console.log(res);
  return res;
};

export const createJiraTic = async (
  email,
  name,
  link,
  priority,
  status,
  summary
) => {
  const res = await apiRequest.post("/create/jiraTicket", {
    email,
    name,
    link,
    priority,
    status,
    summary,
  });
  // console.log(res);
  return res;
};

export const getTickets = async (number, email, admin) => {
  const res = await apiRequest.post("/tickets", {
    startAt: number,
    email,
    admin,
  });
  // console.log(res);
  return res.data;
};
