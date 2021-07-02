import React, { useContext, useReducer } from "react";
import Ajax from "./Ajax/Ajax";
import Header from "../pages/Header";
import Main from "../pages/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
