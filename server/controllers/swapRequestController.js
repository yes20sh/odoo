import { SwapRequest } from '../models/SwapRequest.js';

export const createSwapRequest = async (req, res) => {
  const { toUser, offeredSkill, requestedSkill, message } = req.body;

  try {
    const request = await SwapRequest.create({
      fromUser: req.userId,
      toUser,
      offeredSkill,
      requestedSkill,
      message
    });

    res.status(201).json({ message: 'Swap request sent', request });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create swap request', error: err.message });
  }
};

export const getMySwapRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      $or: [{ fromUser: req.userId }, { toUser: req.userId }]
    })
      .populate('fromUser', 'name username')
      .populate('toUser', 'name username');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch swap requests', error: err.message });
  }
};

export const updateSwapStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await SwapRequest.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
};
