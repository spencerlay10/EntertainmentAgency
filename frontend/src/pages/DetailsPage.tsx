import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEntertainerById, updateEntertainer, deleteEntertainer } from '../api/EntertainerAPI'; // Import from your API file

function DetailsPage() {
  const { id } = useParams();
  const [entertainer, setEntertainer] = useState(null);
  const [editedEntertainer, setEditedEntertainer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch entertainer details using the imported API function
    const loadEntertainer = async () => {
      try {
        const data = await fetchEntertainerById(Number(id));  // Make sure id is a number
        setEntertainer(data);
        setEditedEntertainer(data); // Set the initial form data to the entertainer's data
      } catch (error) {
        console.error("Error fetching entertainer:", error);
      }
    };

    loadEntertainer();
  }, [id]);

  const handleEdit = (e) => {
    setEditedEntertainer({
      ...editedEntertainer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Send the updated entertainer data to the backend
      await updateEntertainer(Number(id), editedEntertainer); 
      navigate('/entertainers'); // Navigate back to the entertainers list page after saving
    } catch (error) {
      console.error("Error saving entertainer:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEntertainer(Number(id)); // Delete entertainer by ID
      navigate('/entertainers'); // Redirect to the entertainers list page after deletion
    } catch (error) {
      console.error("Error deleting entertainer:", error);
    }
  };

  if (!entertainer) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{entertainer.entStageName} Details</h2>

      {/* New fields */}
      <p>Times Booked: {entertainer.timesBooked}</p>
      <p>Last Booked Date: {entertainer.lastBookedDate ? new Date(entertainer.lastBookedDate).toLocaleDateString() : 'N/A'}</p>

      {/* Editable form fields */}
      <div>
        <label>Stage Name:</label>
        <input
          type="text"
          name="entStageName"
          value={editedEntertainer.entStageName}
          onChange={handleEdit}
        />
      </div>
      <div>
        <label>SSN:</label>
        <input
          type="text"
          name="entSsn"
          value={editedEntertainer.entSsn}
          onChange={handleEdit}
        />
      </div>
      <div>
        <label>Street Address:</label>
        <input
          type="text"
          name="entStreetAddress"
          value={editedEntertainer.entStreetAddress}
          onChange={handleEdit}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="entCity"
          value={editedEntertainer.entCity}
          onChange={handleEdit}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="entState"
          value={editedEntertainer.entState}
          onChange={handleEdit}
        />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          name="entZipCode"
          value={editedEntertainer.entZipCode}
          onChange={handleEdit}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="entEmailAddress"
          value={editedEntertainer.entEmailAddress}
          onChange={handleEdit}
        />
      </div>

      {/* Save and Cancel buttons */}
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
      <button className="btn btn-secondary" onClick={() => navigate(`/entertainers`)}>Cancel</button>

      {/* Delete button */}
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DetailsPage;
