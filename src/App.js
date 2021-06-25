import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import Activity from './pages/Activity/Activity';


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <Activity />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;