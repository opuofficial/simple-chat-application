export const setDataToLocalstorage = (data) => {
  localStorage.setItem("mern-messenger", JSON.stringify(data));
};

export const getDataFromLocalstorage = () => {
  return JSON.parse(localStorage.getItem("mern-messenger"));
};

export const removeDataFromLocalstorage = () => {
  localStorage.removeItem("mern-messenger");
};
