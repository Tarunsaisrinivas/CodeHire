import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobSearch from "./components/JobSearch";
import NotFound from "./components/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/jobSearch" element={<JobSearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
