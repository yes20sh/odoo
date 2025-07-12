import express from 'express';
import {
  createSwapRequest,
  getMySwapRequests,
  updateSwapStatus
} from '../controllers/swapRequestController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/request', requireAuth, createSwapRequest);         // POST /api/swaps/request
router.get('/mine', requireAuth, getMySwapRequests);             // GET /api/swaps/mine
router.patch('/:id/status', requireAuth, updateSwapStatus);      // PATCH /api/swaps/:id/status

export default router;
