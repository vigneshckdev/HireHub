import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const backendURL = "https://job-posting-application-backend.vercel.app";

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${backendURL}/jobPostingInfo`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching job data:", err);
      setError("Unable to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${backendURL}/jobPostings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete job");

      // Remove deleted job from state
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));

      // Show success toast
      toast.error("Job post deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      console.error("Error deleting job:", err);
      // Show error toast
      toast.error("Failed to delete job. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Filter jobs based on search
  const filteredJobs = jobs.filter((job) =>
    job.jobTitle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />

      {/* Search Bar */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <h2 className="container mt-3">All Jobs</h2>
      {/* Status Messages */}
      <div className="container mt-3">
        {loading && <div className="text-center text-muted">Loading jobs...</div>}
        {error && <div className="text-center text-danger">{error}</div>}
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="text-center text-muted">No jobs found.</div>
        )}
      </div>

      {/* Job Cards */}
      <div className="container mt-3">
        <div className="row g-4">
          {!loading &&
            !error &&
            filteredJobs.map((job) => (
              <div key={job._id} className="col-md-4">
                <div className="card shadow-sm h-100 border-0 rounded-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-primary">
                      {job.jobTitle || "N/A"}
                    </h5>
                    <p>
                      <strong>Company:</strong> {job.companyName || "N/A"}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location || "N/A"}
                    </p>
                    <p>
                      <strong>Job Type:</strong> {job.jobType || "N/A"}
                    </p>

                    <div className="d-flex justify-content-between mt-4">
                      {/* Primary Blue Button */}
                      <button
                        className="btn btn-primary btn-sm px-3"
                        onClick={() => navigate(`/jobPostingInfo/${job._id}`)}
                      >
                        See Details
                      </button>

                      {/* Red Danger Button */}
                      <button
                        className="btn btn-danger btn-sm px-3"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Home;
