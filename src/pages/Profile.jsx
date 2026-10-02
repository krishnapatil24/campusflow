import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

const defaultProfile = {
  name: "Krish Sharma",
  email: "krish@student.campusflow.edu",
  phone: "+91 98765 43210",
  department: "Electrical & Electronics Engineering",
  year: "2nd Year",
  studentId: "BT25EEE092",
};

function Profile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("campusflow_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile({ ...defaultProfile, ...parsed });
      } catch {
        setProfile(defaultProfile);
      }
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("campusflow_profile", JSON.stringify(profile));
    setSuccessMessage("Profile updated successfully");
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <section className="profile-page">
        <div className="profile-header-card">
          <div className="profile-avatar">KS</div>
          <div>
            <p className="eyebrow">Student</p>
            <h2>{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
          </div>
        </div>

        {successMessage && <div className="success-message profile-success">{successMessage}</div>}

        <div className="profile-card-grid">
          <div className="profile-card panel-box">
            <div className="panel-header compact-panel-header">
              <h3>Personal Information</h3>
              {!isEditing && (
                <button type="button" className="secondary-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="profile-form-grid">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" value={profile.name} onChange={handleChange} />
                </label>
                <label>
                  <span>Phone</span>
                  <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
                </label>
                <label>
                  <span>Department</span>
                  <input type="text" name="department" value={profile.department} onChange={handleChange} />
                </label>
                <label>
                  <span>Year</span>
                  <input type="text" name="year" value={profile.year} onChange={handleChange} />
                </label>
                <div className="profile-form-actions">
                  <button type="button" className="primary-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button type="button" className="secondary-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-detail-list">
                <div><strong>Name</strong><span>{profile.name}</span></div>
                <div><strong>Email</strong><span>{profile.email}</span></div>
                <div><strong>Phone</strong><span>{profile.phone}</span></div>
              </div>
            )}
          </div>

          <div className="profile-card panel-box">
            <div className="panel-header compact-panel-header">
              <h3>Academic Information</h3>
            </div>

            <div className="profile-detail-list">
              <div><strong>Department</strong><span>{profile.department}</span></div>
              <div><strong>Year</strong><span>{profile.year}</span></div>
              <div><strong>Student ID</strong><span>{profile.studentId}</span></div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Profile;
