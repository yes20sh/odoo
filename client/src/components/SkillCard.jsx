const SkillCard = ({ skill }) => {
  return (
    <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full mr-1 mb-1">
      {skill}
    </span>
  );
};

export default SkillCard;
