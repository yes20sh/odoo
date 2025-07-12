const ProfileCard = ({ user, onRequestClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePhoto || 'https://via.placeholder.com/40'}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <div className="text-xs text-gray-500 flex gap-2 flex-wrap">
            {user.skillsOffered.map((skill, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => onRequestClick(user)}
        className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md"
      >
        Request
      </button>
    </div>
  );
};

export default ProfileCard;
