import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobSearch from "./components/JobSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
