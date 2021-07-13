import React from "react";
import ReactDOM from "react-dom";
import BoardView from "./components/Board";
import "./main.css";
import "./styles.css";

const App = () => {
  return <BoardView />;
};

ReactDOM.render(<App />, document.getElementById("root"));
