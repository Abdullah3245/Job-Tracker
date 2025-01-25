import React, { useState } from "react";
import "./popup.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Popup(props) {
    const [companyName, setCompanyName] = useState("");
    const [roleName, setRoleName] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [applicationDate, setApplicationDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobData = {
            companyName,
            roleName,
            salary,
            location,
            applicationDate,
        };

        try {
            await setDoc(doc(db, "Users", props.userID, "Jobs", companyName), jobData);
            console.log("Job added successfully to Users collection!");

            // Call the parent's fetchJobs function to update the job list
            props.onJobAdded();

            props.setTrigger(false); // Close popup
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return props.trigger ? (
        <div className="popup"> 
            <div className="popup-inner">
                <h2>Add Job Details</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="company-name">Company Name</label>
                    <input
                        id="company-name"
                        type="text"
                        placeholder="Google"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />

                    <label htmlFor="role-name">Role</label>
                    <input
                        id="role-name"
                        type="text"
                        placeholder="Software Engineer"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        required
                    />

                    <label htmlFor="salary">Salary</label>
                    <input
                        id="salary"
                        type="text"
                        placeholder="100,000"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />

                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Mountain View, CA"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <label htmlFor="application-date">Application Date</label>
                    <input
                        id="application-date"
                        type="date"
                        value={applicationDate}
                        onChange={(e) => setApplicationDate(e.target.value)}
                    />

                    <div className="popup-buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => props.setTrigger(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
}
