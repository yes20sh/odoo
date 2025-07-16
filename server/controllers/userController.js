import { User } from '../models/User.js';

// PATCH /api/users/:id/profile
export const updateUserProfile = async (req, res) => {
  const userId = req.params.id;

  const {
    name,
    location,
    skillsOffered,
    skillsWanted,
    availability,
    profilePhoto,
    profileVisibility
  } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update only allowed fields
    if (name) user.name = name;
    if (location) user.location = location;
    if (skillsOffered) user.skillsOffered = skillsOffered;
    if (skillsWanted) user.skillsWanted = skillsWanted;
    if (availability) user.availability = availability;
    if (profilePhoto) user.profilePhoto = profilePhoto;
    if (profileVisibility) user.profileVisibility = profileVisibility;

    const updatedUser = await user.save();

    // Don't send password in response
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error while updating profile.' });
  }
};


// GET /api/users/:id
export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile.' });
  }
};
