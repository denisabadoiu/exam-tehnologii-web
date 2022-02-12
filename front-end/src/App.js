
import './App.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Crewmember from "./components/Crewmember";
import Ship from "./components/Ship";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/crewmember/:id">
            <Crewmember />
          </Route>
          <Route path="/">
            <Ship/>
          </Route>

        </Switch>
      </Router>
  );
}

export default App;
