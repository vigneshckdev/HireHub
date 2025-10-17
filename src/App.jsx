import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobPost from "./pages/JobPost";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post-job" element={<JobPost />} />
      <Route path="/jobPostingInfo/:id" element={<JobDetails/>}/>
    </Routes>
  );
}

export default App;