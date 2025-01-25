import React, { useState, useEffect } from "react"
import Popup from "./popup"
import "./main.css"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import Footer from "./footer"

export default function Main() {
  const [addJob, setAddJob] = useState(false)
  const [jobs, setJobs] = useState([])
  const [editJob, setEditJob] = useState(null)

  const navigate = useNavigate()

  const location = useLocation()
  const { userID, displayName } = location.state || {}

  useEffect(() => {
    if (userID) {
      fetchJobs()
    }
  }, [userID])

  const fetchJobs = async () => {
    try {
      const jobsCollectionRef = collection(db, "Users", userID, "Jobs")
      const q = query(jobsCollectionRef)
      const querySnapshot = await getDocs(q)

      const jobsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setJobs(jobsData)
    } catch (error) {
      console.error("Error fetching jobs: ", error)
    }
  }

  const handleEdit = (job) => {
    setEditJob(job)
    setAddJob(true)
  }

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteDoc(doc(db, "Users", userID, "Jobs", jobId))
        fetchJobs() // Refresh the job list
      } catch (error) {
        console.error("Error deleting job: ", error)
      }
    }
  }

  return (
    <div id="main-container">
       <title>Main</title>
      <nav>
        <p onClick={() => navigate("/")}>Job Tracker</p>
        <div className="nav-buttons">
          <button className="button-20" onClick={() => setAddJob(true)}>
            Add Job
          </button>
          <button className="logout-button" onClick={() => navigate("/login")}>
            Log out
          </button>
        </div>
      </nav>
      <Popup
        trigger={addJob}
        setTrigger={setAddJob}
        userID={userID}
        onJobAdded={fetchJobs}
        jobToEdit={editJob}
        setJobToEdit={setEditJob}
      />
      <h1>Welcome {displayName}.</h1>
      <h2>Here are your job listings:</h2>

      <div className="job-cards-container">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-card-header">
                <h2>
                  Company: {job.companyName}
                  <span>Role : {job.roleName}</span>
                </h2>
              </div>
              <div className="job-card-details">
                <div className="job-info">
                  <strong>Salary</strong>
                  <span>${job.salary}</span>
                </div>
                <div className="job-info">
                  <strong>Location</strong>
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="job-card-footer">
                <h3>
                  Applied:{" "}
                  <span>{job.applicationDate ? new Date(job.applicationDate).toLocaleDateString("en-US") : "N/A"}</span>
                </h3>
                <div className="job-card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(job)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-jobs-message">No jobs found. Add a new job using the "Add Job" button above.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

