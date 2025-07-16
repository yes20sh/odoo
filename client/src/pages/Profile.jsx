import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    availability: '',
    profileVisibility: '',
    profilePhoto: '',
    skillsOffered: [],
    skillsWanted: [],
  });

  const [skillInputs, setSkillInputs] = useState({ offered: '', wanted: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${api}/users/${id}`, { withCredentials: true })
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Failed to fetch user:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = (type) => {
    const skill = skillInputs[type].trim();
    if (!skill) return;

    const field = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    if (!formData[field].includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], skill],
      }));
      setSkillInputs((prev) => ({ ...prev, [type]: '' }));
    }
  };

  const handleSkillRemove = (type, skill) => {
    const field = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.patch(`${api}/users/${id}/profile`, formData, {
        withCredentials: true,
      });
      setMessage('Profile updated successfully!');
      setFormData(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black p-10 min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                  placeholder="Your Location"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Skills Offered */}
              <div>
                <label className="block text-sm font-medium">Skills Offered</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.skillsOffered.map((skill, i) => (
                    <span key={i} className="bg-gray-200 text-black px-3 py-1 rounded-full m-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove('offered', skill)}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  value={skillInputs.offered}
                  onChange={(e) => setSkillInputs({ ...skillInputs, offered: e.target.value })}
                  className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded-md"
                  placeholder="Add a skill"
                />
                <button type="button" onClick={() => handleSkillAdd('offered')} className="mt-2 text-blue-500">
                  Add Skill
                </button>
              </div>

              {/* Skills Wanted */}
              <div>
                <label className="block text-sm font-medium">Skills Wanted</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.skillsWanted.map((skill, i) => (
                    <span key={i} className="bg-gray-200 text-black px-3 py-1 rounded-full m-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove('wanted', skill)}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  value={skillInputs.wanted}
                  onChange={(e) => setSkillInputs({ ...skillInputs, wanted: e.target.value })}
                  className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded-md"
                  placeholder="Add a skill"
                />
                <button type="button" onClick={() => handleSkillAdd('wanted')} className="mt-2 text-blue-500">
                  Add Skill
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Availability</label>
                <input
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                  placeholder="e.g., Weekends"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Profile Visibility</label>
                <input
                  name="profileVisibility"
                  value={formData.profileVisibility}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md"
                  placeholder="Public or Private"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-x-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-2 border-gray-300 overflow-hidden">
              <img
                src={formData.profilePhoto || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <input
              name="profilePhoto"
              value={formData.profilePhoto}
              onChange={handleChange}
              placeholder="Image URL"
              className="p-2 mt-4 bg-gray-100 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
          {message && <p className="text-green-600 mt-2">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default Profile;
