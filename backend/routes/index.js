import express from 'express';
import rateLimit from 'express-rate-limit';
import { createAutobot, getAutobots, getAutobotById, getAutobotPosts, getPostComments, getAllAutobots } from '../controllers/autobotController.js';

const router = express.Router();

// Rate limiter to limit repeated requests to public APIs
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5 // Limit each IP to 5 requests per 'window' (here, per minute)
});

// Route to get all Autobots without pagination
router.get('/autobots/all', limiter, getAllAutobots);

// Route to get Autobots with pagination
router.get('/autobots', limiter, getAutobots);

// Route to get a specific Autobot by ID
router.get('/autobots/:id', limiter, getAutobotById);

// Route to get a specific Autobot’s posts
router.get('/autobots/:id/posts', limiter, getAutobotPosts);

// Route to get comments for a specific post
router.get('/posts/:postId/comments', limiter, getPostComments);

// Route to manually trigger the creation of Autobots
router.post('/create-autobots', createAutobot);

export default router;
