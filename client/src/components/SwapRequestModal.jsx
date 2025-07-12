import { useState } from 'react';

const SwapRequestModal = ({ isOpen, onClose, onSubmit, user, mySkills }) => {
  const [offered, setOffered] = useState('');
  const [wanted, setWanted] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Send Swap Request to {user.name}</h2>

        <div>
          <label className="block text-xs font-semibold mb-1">Choose one of your offered skills</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={offered}
            onChange={(e) => setOffered(e.target.value)}
          >
            <option value="">Select a skill</option>
            {mySkills.map((skill, idx) => (
              <option key={idx} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">Choose one of their wanted skills</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={wanted}
            onChange={(e) => setWanted(e.target.value)}
          >
            <option value="">Select a skill</option>
            {user.skillsWanted.map((skill, idx) => (
              <option key={idx} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">Message</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="text-sm text-gray-600 hover:underline">Cancel</button>
          <button
            onClick={() => onSubmit({ offered, wanted, message })}
            className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapRequestModal;
