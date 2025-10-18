import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const backendURL = "https://job-posting-application-backend.vercel.app";

  const validateForm = () => {
    let newErrors = {};

    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    else if (formData.jobTitle.length < 3)
      newErrors.jobTitle = "Job title must be at least 3 characters.";

    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required.";

    if (!formData.location.trim())
      newErrors.location = "Location is required.";

    if (!formData.salary) newErrors.salary = "Salary is required.";
    else if (isNaN(formData.salary) || Number(formData.salary) <= 0)
      newErrors.salary = "Enter a valid salary greater than 0.";

    if (!formData.jobType)
      newErrors.jobType = "Please select a job type.";

    if (!formData.jobDescription.trim())
      newErrors.jobDescription = "Job description is required.";
    else if (formData.jobDescription.length < 20)
      newErrors.jobDescription = "Description should be at least 20 characters.";

    if (!formData.jobQualification.trim())
      newErrors.jobQualification = "Please add at least one qualification.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const qualifications = formData.jobQualification
      ? formData.jobQualification
          .split(/\r?\n/)
          .map((q) => q.trim())
          .filter(Boolean)
      : [];

    const payload = {
      jobTitle: formData.jobTitle.trim(),
      companyName: formData.companyName.trim(),
      location: formData.location.trim(),
      salary: Number(formData.salary),
      jobType: formData.jobType,
      jobDescription: formData.jobDescription.trim(),
      jobQualification: qualifications,
    };

    try {
      const response = await fetch(`${backendURL}/jobPostings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Job Posted Successfully!", {
          theme: "colored",
          position: "bottom-right",
          autoClose: 2000,
        });

        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          salary: "",
          jobType: "",
          jobDescription: "",
          jobQualification: "",
        });

        // Delay navigation slightly to let toast appear
        setTimeout(() => navigate("/"), 2000);
      } else {
        const errorText = await response.text();
        console.error("Failed to post job. Server responded with:", errorText);
        toast.error("❌ Failed to post job. Check console for details.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("⚠️ Something went wrong. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
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

                <form onSubmit={handleSubmit} noValidate>
                  {/* Job Title */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={`form-control ${errors.jobTitle ? "is-invalid" : ""}`}
                      required
                    />
                    {errors.jobTitle && (
                      <div className="invalid-feedback">{errors.jobTitle}</div>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                      required
                    />
                    {errors.companyName && (
                      <div className="invalid-feedback">{errors.companyName}</div>
                    )}
                  </div>

                  {/* Location + Salary */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`form-control ${errors.location ? "is-invalid" : ""}`}
                        required
                      />
                      {errors.location && (
                        <div className="invalid-feedback">{errors.location}</div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Salary</label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className={`form-control ${errors.salary ? "is-invalid" : ""}`}
                        required
                      />
                      {errors.salary && (
                        <div className="invalid-feedback">{errors.salary}</div>
                      )}
                    </div>
                  </div>

                  {/* Job Type */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Job Type</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className={`form-select ${errors.jobType ? "is-invalid" : ""}`}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Full-Time(On-site)">Full-Time(On-site)</option>
                      <option value="Part-Time(On-site)">Part-Time(On-site)</option>
                      <option value="Full-Time(Remote)">Full-Time(Remote)</option>
                      <option value="Part-Time(Remote)">Part-Time(Remote)</option>
                    </select>
                    {errors.jobType && (
                      <div className="invalid-feedback">{errors.jobType}</div>
                    )}
                  </div>

                  {/* Job Description */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Job Description</label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleChange}
                      className={`form-control ${errors.jobDescription ? "is-invalid" : ""}`}
                      rows="3"
                      required
                    ></textarea>
                    {errors.jobDescription && (
                      <div className="invalid-feedback">{errors.jobDescription}</div>
                    )}
                  </div>

                  {/* Qualifications */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Job Qualifications (one per line)
                    </label>
                    <textarea
                      name="jobQualification"
                      value={formData.jobQualification}
                      onChange={handleChange}
                      className={`form-control ${errors.jobQualification ? "is-invalid" : ""}`}
                      rows="3"
                      placeholder="Enter each qualification on a new line"
                      required
                    ></textarea>
                    {errors.jobQualification && (
                      <div className="invalid-feedback">{errors.jobQualification}</div>
                    )}
                  </div>

                  {/* Submit */}
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

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default JobPost;
