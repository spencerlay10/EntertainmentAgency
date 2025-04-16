import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { fetchEntertainers } from '../api/EntertainerAPI';

function EntertainerPage() {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEntertainers = async () => {
      try {
        setLoading(true);
        const data = await fetchEntertainers();

        setEntertainers(data.entertainers); // Assuming 'data.entertainers' is the correct field
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEntertainers();
  }, []);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h2>Entertainers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Stage Name</th>
            <th>Times Booked</th>
            <th>Last Booked Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map(ent => (
            <tr key={ent.entertainerId}>
              <td>{ent.entStageName}</td>
              <td>{ent.timesBooked}</td> {/* Display the number of bookings */}
              <td>{ent.lastBookedDate ? new Date(ent.lastBookedDate).toLocaleDateString() : 'N/A'}</td> {/* Format the last booking date */}
              <td>
                <Link to={`/entertainers/${ent.entertainerId}`} className="btn btn-info">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={() => navigate('/add')}>Add Entertainer</button>
    </div>
  );
}

export default EntertainerPage;
