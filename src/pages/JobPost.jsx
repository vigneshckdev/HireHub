import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const JobPost = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    jobDescription: "",
    jobQualification: "",
  });

  const navigate = useNavigate();
  const backendURL = "https://job-posting-application-backend.vercel.app";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const qualifications = formData.jobQualification
      ? formData.jobQualification
          .split(/[\n,]/)
          .map((q) => q.trim())
          .filter(Boolean)
      : [];

    const payload = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      location: formData.location,
      salary: Number(formData.salary),
      jobType: formData.jobType,
      jobDescription: formData.jobDescription,
      jobQualification: qualifications, // Use the safely processed array
    };

    try {
      const response = await fetch(`${backendURL}/jobPostings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);
        alert("Job Posted Successfully!");
        
        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          salary: "",
          jobType: "",
          jobDescription: "",
          jobQualification: "",
        });
        navigate("/");
      } else {
        const errorText = await response.text();
        console.error("Failed to post job. Server responded with:", errorText);
        alert("Failed to post job. Check console for details.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  Post a Job
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Salary</label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Job Type</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Full-Time(On-site)">Full-Time(On-site)</option>
                      <option value="Part-Time(On-site)">Part-Time(On-site)</option>
                      <option value="Full-Time(Remote)">Full-Time(Remote)</option>
                      <option value="Part-Time(Remote)">Part-Time(Remote)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Job Description</label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Job Qualifications (one per line)
                    </label>
                    <textarea
                      name="jobQualification"
                      value={formData.jobQualification}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      placeholder="Enter each qualification on a new line"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold rounded-3 shadow-sm"
                  >
                    Post Job
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;