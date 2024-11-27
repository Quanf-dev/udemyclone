export const getUser = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCourse = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};