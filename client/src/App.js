import Home from "./Home.js";
import myExchange from "./myExchange.js";
import Modules from "./Modules.js";
import mapTool from "./mapTool.js";
import Universities from "./Universities.js";
import {Route} from "react-router-dom";

function App() {
  return (
      <div>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/myexchange" component = {myExchange} />
        <Route exact path = "/modules" component = {Modules} />
        <Route exact path = "/universities" component = {Universities} />
        <Route exact path = "/maptool" component = {mapTool} />
      </div>
  );
}

export default App;
