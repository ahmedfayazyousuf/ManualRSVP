import React, { createContext, useReducer} from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";

import Signup from "./components/Signup/Signup";
import {initialState, reducer } from "../src/reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Signup />} />
    </Routes>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value = {{state, dispatch}}>
        <Routing />
      </UserContext.Provider>
    </>
  )
}
export default App
