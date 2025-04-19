import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEntertainerById, updateEntertainer, deleteEntertainer } from '../api/EntertainerAPI';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entertainer, setEntertainer] = useState(null);
  const [editedEntertainer, setEditedEntertainer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        const data = await fetchEntertainerById(Number(id));
        const flatData = {
          ...data.entertainer,
          timesBooked: data.timesBooked,
          lastBookedDate: data.lastBookedDate,
        };
        setEntertainer(flatData);
        setEditedEntertainer(flatData);
      } catch (error) {
        console.error("Error fetching entertainer:", error);
      }
    };

    loadEntertainer();
  }, [id]);

  const handleChange = (e) => {
    setEditedEntertainer({
      ...editedEntertainer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateEntertainer(Number(id), editedEntertainer);
      setEntertainer(editedEntertainer);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating entertainer:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEntertainer(Number(id));
      navigate('/entertainers');
    } catch (error) {
      console.error("Error deleting entertainer:", error);
    }
  };

  const handleCancel = () => {
    setEditedEntertainer(entertainer);
    setIsEditing(false);
  };

  if (!entertainer) return <p className="container mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{entertainer.entStageName} Details</h2>

      <div className="row">
        <div className="col-md-6">
          {["entStageName", "entSsn", "entStreetAddress", "entCity", "entState", "entZipCode", "entPhoneNumber", "entWebPage", "entEmailAddress", "dateEntered", "timesBooked", "lastBookedDate"].map((field) => (
            <div key={field} className="mb-3">
              <label className="form-label">{field}</label>
              <input
                type={field.includes("Date") ? "date" : "text"}
                name={field}
                value={editedEntertainer[field] || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-control"
              />
            </div>
          ))}
        </div>
      </div>

      {!isEditing ? (
        <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)}>Edit</button>
      ) : (
        <>
          <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
        </>
      )}
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DetailsPage;