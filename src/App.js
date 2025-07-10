import AppScreen from "./screens/AppScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AvatarScreenMale from './screens/AvatarScreenMale'
import AvatarScreenFemale from './screens/AvatarScreenFemale'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AvatarScreenMale} index />
        <Route path="/female" Component={AvatarScreenFemale} index />
        <Route path="/generate" Component={AppScreen}  />
      </Routes>
    </Router>
  );
}

export default App;
