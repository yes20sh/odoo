import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const MyRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/swap-requests/my');
      setSentRequests(res.data.sent || []);
      setReceivedRequests(res.data.received || []);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await api.post(`/swap-requests/${id}/accept`);
      fetchRequests();
    } catch (err) {
      console.error('Failed to accept:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post(`/swap-requests/${id}/reject`);
      fetchRequests();
    } catch (err) {
      console.error('Failed to reject:', err);
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Requests You Received</h2>
          {receivedRequests.length === 0 ? (
            <p className="text-sm text-gray-500">No incoming requests yet.</p>
          ) : (
            <div className="space-y-4">
              {receivedRequests.map((req) => (
                <div key={req._id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{req.fromUser.name}</p>
                    <p className="text-xs text-gray-500">
                      Wants: <span className="font-medium">{req.wantedSkill}</span> | Offers: <span className="font-medium">{req.offeredSkill}</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{req.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleAccept(req._id)} className="bg-green-600 text-white px-3 py-1 text-xs rounded-md">Accept</button>
                    <button onClick={() => handleReject(req._id)} className="bg-red-500 text-white px-3 py-1 text-xs rounded-md">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Requests You Sent</h2>
          {sentRequests.length === 0 ? (
            <p className="text-sm text-gray-500">No sent requests yet.</p>
          ) : (
            <div className="space-y-4">
              {sentRequests.map((req) => (
                <div key={req._id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{req.toUser.name}</p>
                    <p className="text-xs text-gray-500">
                      You Offered: <span className="font-medium">{req.offeredSkill}</span> | Wanted: <span className="font-medium">{req.wantedSkill}</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{req.message}</p>
                  </div>
                  <div>
                    <span
                      className={`text-xs font-semibold ${
                        req.status === 'pending' ? 'text-yellow-600' :
                        req.status === 'accepted' ? 'text-green-600' :
                        'text-red-500'
                      }`}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyRequests;
