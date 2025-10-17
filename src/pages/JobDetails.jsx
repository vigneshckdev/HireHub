import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  const backendURL = "https://job-posting-application-backend.vercel.app";

  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (appliedJobs.includes(id)) {
      setApplied(true);
    }
  }, [id]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${backendURL}/jobPostingInfo/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const processQualifications = (qualifications) => {
    if (Array.isArray(qualifications)) {
      return qualifications.filter((q) => q && q.trim() !== "");
    } else if (typeof qualifications === "string") {
      return qualifications
        .split(",")
        .map((q) => q.trim())
        .filter((q) => q !== "");
    }
    return [];
  };

  const handleApply = () => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    if (!appliedJobs.includes(id)) {
      appliedJobs.push(id);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      setApplied(true);

      toast.success("You have successfully applied!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    } else {
      toast.info("You’ve already applied for this job!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  if (loading)
    return (
      <div>
        <Header />
        <div className="text-center mt-5">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div>
        <Header />
        <div className="text-center mt-5 text-danger">{error}</div>
      </div>
    );

  // Job not found
  if (!job)
    return (
      <div>
        <Header />
        <div className="text-center mt-5">Job not found.</div>
      </div>
    );

  const processedQualifications = processQualifications(job.jobQualification);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        {/* Job Title */}
        <h2 className="mb-3 fw-bold text-primary">{job.jobTitle}</h2>

        <div className="card shadow-sm p-4 border-0 rounded-3">
          {/* Company Details */}
          <div className="row mb-4">
            <div className="col-md-6">
              <p>
                <strong>Company Name:</strong> {job.companyName}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Salary:</strong> ₹{job.salary.toLocaleString()}
              </p>
              <p>
                <strong>Job Type:</strong> {job.jobType}
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-4">
            <h5 className="fw-bold text-secondary mb-3">Job Description:</h5>
            <p className="text-muted">{job.jobDescription}</p>
          </div>

          {/* Qualifications */}
          <div className="mb-3">
            <h5 className="fw-bold text-secondary mb-3">Qualifications:</h5>
            {processedQualifications.length > 0 ? (
              <ol className="ps-3">
                {processedQualifications.map((qual, index) => (
                  <li key={index} className="mb-2 text-muted">
                    {qual}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-muted">No qualifications listed.</p>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              style={{
                backgroundColor: applied ? "#156102" : "#0d6efd",
                color: "#f3f7f2",
                transition: "all 0.3s ease",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)"
              }}
              className={`btn ${
                applied ? "btn-success" : "btn-primary"
              } px-4 py-2 rounded-3`}
              onClick={handleApply}
              disabled={applied}
            >
              {applied ? "Applied" : "Apply Now"}
            </button>

            <button
              className="btn btn-secondary px-4 py-2 rounded-3"
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default JobDetails;
