import React, { createContext, useReducer, useContext } from "react";

const CountContext = createContext();
const { Provider } = CountContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "out":
      return {
        ...state,
        status: "out",
        userID: "user",
        userName: "name",
        userToken: "token",
        login: "block",
        logout: "none"
      }
    case "in":
      return {
        ...state,
        status: "in",
        login:"none",
        logout:"block",
        userName: action.userName,
        userID: action.userID,
        userToken: action.userToken,
        lat: action.lat,
        lng: action.lng
      }
    case "drag":
      return {
        ...state,
        postcode: action.postcode,
        lat: action.lat,
        lng: action.lng
      }
    case "radius":
      return {
        ...state,
        radius: action.radius

      }
    case "notice":
      return {
        ...state,
        displayNotice:"block",
        sender:action.sender
      }
    case "closeNotice":
      return {
        ...state,
        displayNotice:"none"
      } 
    case "reply":
      return {
        ...state,
        displayReply:"block"
      }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const CountProvider = ({ value = 0, ...props }) => {
  const [state, dispatch] = useReducer(
    reducer, {
    status: "out",
    displayNotice:"none",
    displayReply:"none",
    sender:"sender",
    login: "block",
    logout: "none",
    userID: "user",
    userName: "name",
    userToken: "token",
    postcode: "",
    lat: "",
    lng: ""
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useCountContext = () => {
  return useContext(CountContext);
};

export { CountProvider, useCountContext };

