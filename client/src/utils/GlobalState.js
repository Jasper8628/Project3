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
        sidebar: "none"
      }
    case "in":
      return {
        ...state,
        status: "in",
        userName: action.userName,
        userID: action.userID,
        userToken: action.userToken,
        lat: action.lat,
        lng: action.lng,
        line1: action.line1,
        line2: action.line2,
        postcode: action.postcode
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
        displayNotice: "block",
        displayRequest: "none",
        displayConfirm: "none",
        sender: action.sender
      }
    case "closeNotice":
      return {
        ...state,
        displayNotice: "none"
      }
    case "reply":
      return {
        ...state,
        displayNotice: "block",
        displayRequest: "none",
        displayConfirm: "block"
      }
    case "confirm":
      return {
        ...state,
        displayNotice: "block",
        displayRequest: "none",
        displayConfirm: "block"
      }
    case "request":
      return {
        ...state,
        displayNotice: "block",
        displayRequest: "block"
      }
    case "add":
      const requestList = state.requests;
      const checkDuplicate = requestList.find(item => item._id === action.request._id);
      if (!checkDuplicate) {
        requestList.push(action.request);
      }
      return {
        ...state,
        requests: requestList
      }
    case "cancel":
      return {
        ...state,
        requests: action.requests
      }
    case "sidebar":
      return {
        ...state,
        sidebar: "block"
      }
    case "sidebarOff":
      return {
        ...state,
        sidebar: "none"
      }
    case "signIn":
      return {
        ...state,
        signIn: "block",
        signUp: "none",
      }
    case "signUp":
      return {
        ...state,
        signIn: "none",
        signUp: "block"
      }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const CountProvider = ({ value = 0, ...props }) => {
  const [state, dispatch] = useReducer(
    reducer, {
    status: "out",
    displayNotice: "none",
    displayRequest: "none",
    displayConfirm: "none",
    requests: [],
    sender: "sender",
    signIn: "block",
    signUp: "none",
    userID: "user",
    userName: "name",
    userToken: "token",
    postcode: "",
    radius: 50,
    lat: "",
    lng: "",
    line1: "",
    line2: "",
    sidebar: "none"

  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useCountContext = () => {
  return useContext(CountContext);
};

export { CountProvider, useCountContext };

