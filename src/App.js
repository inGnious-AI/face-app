import AppScreen from "./screens/AppScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GenrateAvatarScreen from './screens/GenrateAvatarScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={GenrateAvatarScreen} index />
        <Route path="/generate" Component={AppScreen}  />
      </Routes>
    </Router>
  );
}

export default App;
