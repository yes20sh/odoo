import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const CreateRequest = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedOffered, setSelectedOffered] = useState('');
  const [selectedWanted, setSelectedWanted] = useState('');
  const [message, setMessage] = useState('');
  const [mySkills, setMySkills] = useState([]);
  const [targetSkills, setTargetSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, meRes] = await Promise.all([
          api.get('/users'),
          api.get('/users/me'),
        ]);
        setUsers(usersRes.data.users);
        setMySkills(meRes.data.skillsOffered || []);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    fetchData();
  }, []);

  const handleUserChange = async (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    try {
      const res = await api.get(`/users/${userId}`);
      setTargetSkills(res.data.skillsOffered || []);
    } catch (err) {
      console.error('Error fetching user skills:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !selectedOffered || !selectedWanted) {
      alert('Please select all required fields.');
      return;
    }

    try {
      await api.post('/swap-requests', {
        toUserId: selectedUserId,
        offeredSkill: selectedOffered,
        wantedSkill: selectedWanted,
        message,
      });
      alert('Swap request sent!');
      setSelectedUserId('');
      setSelectedOffered('');
      setSelectedWanted('');
      setMessage('');
      setTargetSkills([]);
    } catch (err) {
      console.error('Failed to send request:', err);
      alert('Request failed.');
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Create Skill Swap Request</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select User</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={selectedUserId}
              onChange={handleUserChange}
            >
              <option value="">-- Choose a user --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.username})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Their Skill (you want)</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={selectedWanted}
              onChange={(e) => setSelectedWanted(e.target.value)}
              disabled={!targetSkills.length}
            >
              <option value="">-- Choose a skill --</option>
              {targetSkills.map((skill, idx) => (
                <option key={idx} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Skill (you offer)</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={selectedOffered}
              onChange={(e) => setSelectedOffered(e.target.value)}
            >
              <option value="">-- Choose a skill --</option>
              {mySkills.map((skill, idx) => (
                <option key={idx} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message (optional)</label>
            <textarea
              className="w-full border px-3 py-2 rounded-md text-sm"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something about the swap..."
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white rounded-md py-3 text-sm font-semibold w-full"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
