import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppScreen from "./screens/AppScreen";
import AvatarScreenMale from './screens/AvatarScreenMale';
import AvatarScreenFemale from './screens/AvatarScreenFemale';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AvatarScreenMale />} />
        <Route path="/female" element={<AvatarScreenFemale />} />
        <Route path="/generate" element={<AppScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
