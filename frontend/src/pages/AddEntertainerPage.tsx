import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { addEntertainer } from '../api/EntertainerAPI';

const AddEntertainerPage = () => {
  const [entertainer, setEntertainer] = useState<Entertainer>({
    entertainerId: 0,
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: '',
    timesBooked: 0,
    lastBookedDate: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntertainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addEntertainer(entertainer);
      navigate('/entertainers'); // Redirect to entertainers list after successful addition
    } catch (error) {
      setError('Failed to add entertainer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Entertainer</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="entStageName">Stage Name</label>
          <input
            type="text"
            className="form-control"
            id="entStageName"
            name="entStageName"
            value={entertainer.entStageName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="entSsn">SSN</label>
          <input
            type="text"
            className="form-control"
            id="entSsn"
            name="entSsn"
            value={entertainer.entSsn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="entStreetAddress">Street Address</label>
          <input
            type="text"
            className="form-control"
            id="entStreetAddress"
            name="entStreetAddress"
            value={entertainer.entStreetAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="entCity">City</label>
          <input
            type="text"
            className="form-control"
            id="entCity"
            name="entCity"
            value={entertainer.entCity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="entState">State</label>
          <input
            type="text"
            className="form-control"
            id="entState"
            name="entState"
            value={entertainer.entState}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="entZipCode">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="entZipCode"
            name="entZipCode"
            value={entertainer.entZipCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="entPhoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="entPhoneNumber"
            name="entPhoneNumber"
            value={entertainer.entPhoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="entWebPage">Web Page</label>
          <input
            type="url"
            className="form-control"
            id="entWebPage"
            name="entWebPage"
            value={entertainer.entWebPage || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="entEmailAddress">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="entEmailAddress"
            name="entEmailAddress"
            value={entertainer.entEmailAddress || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="timesBooked">Times Booked</label>
          <input
            type="number"
            className="form-control"
            id="timesBooked"
            name="timesBooked"
            value={entertainer.timesBooked}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastBookedDate">Last Booked Date</label>
          <input
            type="date"
            className="form-control"
            id="lastBookedDate"
            name="lastBookedDate"
            value={entertainer.lastBookedDate || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Entertainer'}
        </button>
      </form>
    </div>
  );
};

export default AddEntertainerPage;
