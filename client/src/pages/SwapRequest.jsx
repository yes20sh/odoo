import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SkillCard from '../components/SkillCard';
import api from '../services/api';

const SwapRequest = () => {
  const { userId } = useParams();
  const [targetUser, setTargetUser] = useState(null);
  const [mySkills, setMySkills] = useState([]);
  const [form, setForm] = useState({
    wantedSkill: '',
    offeredSkill: '',
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [targetRes, meRes] = await Promise.all([
          api.get(`/users/${userId}`),
          api.get('/users/me'),
        ]);
        setTargetUser(targetRes.data);
        setMySkills(meRes.data.skillsOffered || []);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/swap-requests', {
        toUserId: userId,
        offeredSkill: form.offeredSkill,
        wantedSkill: form.wantedSkill,
        message: form.message,
      });
      alert('Swap request sent!');
      setForm({ wantedSkill: '', offeredSkill: '', message: '' });
    } catch (err) {
      console.error('Error submitting request:', err);
      alert('Request failed');
    }
  };

  if (!targetUser) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={targetUser.profilePhoto || 'https://via.placeholder.com/80'}
              alt="Profile"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold">{targetUser.name}</h2>
              <p className="text-sm text-gray-600">@{targetUser.username}</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Skills Offered:</h3>
            <div className="flex flex-wrap gap-2">
              {targetUser.skillsOffered.map((skill, idx) => (
                <SkillCard key={idx} skill={skill} />
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold mb-2">Send Swap Request</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Skill You Want</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={form.wantedSkill}
              onChange={(e) => setForm({ ...form, wantedSkill: e.target.value })}
            >
              <option value="">-- Select --</option>
              {targetUser.skillsOffered.map((skill, idx) => (
                <option key={idx} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skill You Offer</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={form.offeredSkill}
              onChange={(e) => setForm({ ...form, offeredSkill: e.target.value })}
            >
              <option value="">-- Select --</option>
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
              rows="3"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Say something friendly or specific..."
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

export default SwapRequest;
