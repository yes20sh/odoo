import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import Pagination from '../components/Pagination';
import SwapRequestModal from '../components/SwapRequestModal';
import api from '../services/api';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mySkills, setMySkills] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/users?search=${query}&page=${currentPage}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchMySkills = async () => {
    try {
      const res = await api.get('/users/me');
      setMySkills(res.data.skillsOffered || []);
    } catch (err) {
      console.error('Failed to fetch your skills:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchMySkills();
  }, [query, currentPage]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRequestClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async ({ offered, wanted, message }) => {
    try {
      await api.post('/swap-requests', {
        toUserId: selectedUser._id,
        offeredSkill: offered,
        wantedSkill: wanted,
        message,
      });
      alert('Swap request sent!');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to send request:', err);
      alert('Request failed.');
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by skill or name..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <ProfileCard key={user._id} user={user} onRequestClick={handleRequestClick} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <SwapRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        user={selectedUser}
        mySkills={mySkills}
      />
    </div>
  );
};

export default Home;
