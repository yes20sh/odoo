import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SkillCard from '../components/SkillCard';
import api from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    skillsOffered: [],
    skillsWanted: [],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/me');
      setProfile(res.data);
      setForm({
        name: res.data.name || '',
        skillsOffered: res.data.skillsOffered || [],
        skillsWanted: res.data.skillsWanted || [],
      });
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const handleAddSkill = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const handleRemoveSkill = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleUpdate = async () => {
    try {
      await api.put('/users/update/me', form);
      setEditing(false);
      fetchProfile();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed');
    }
  };

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 mb-6">
          <img
            src={profile.profilePhoto || 'https://via.placeholder.com/80'}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.username}</h2>
            <p className="text-sm text-gray-600">{profile.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            {editing ? (
              <input
                type="text"
                name="name"
                className="w-full border px-4 py-2 rounded-md text-sm"
                value={form.name}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills Offered</label>
            {editing ? (
              form.skillsOffered.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 border px-3 py-1 text-sm rounded-md"
                    value={skill}
                    onChange={(e) => handleArrayChange('skillsOffered', idx, e.target.value)}
                  />
                  <button
                    onClick={() => handleRemoveSkill('skillsOffered', idx)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skillsOffered.map((skill, idx) => (
                  <SkillCard key={idx} skill={skill} />
                ))}
              </div>
            )}
            {editing && (
              <button
                onClick={() => handleAddSkill('skillsOffered')}
                className="text-purple-600 text-xs mt-2"
              >
                + Add Skill
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills Wanted</label>
            {editing ? (
              form.skillsWanted.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 border px-3 py-1 text-sm rounded-md"
                    value={skill}
                    onChange={(e) => handleArrayChange('skillsWanted', idx, e.target.value)}
                  />
                  <button
                    onClick={() => handleRemoveSkill('skillsWanted', idx)}
                    className="text-red-500 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skillsWanted.map((skill, idx) => (
                  <SkillCard key={idx} skill={skill} />
                ))}
              </div>
            )}
            {editing && (
              <button
                onClick={() => handleAddSkill('skillsWanted')}
                className="text-purple-600 text-xs mt-2"
              >
                + Add Skill
              </button>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="text-sm text-gray-600">
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-black text-white text-sm px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-black text-white text-sm px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
