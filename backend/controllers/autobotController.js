import { createAutobotData } from '../services/autobotService.js';
import { Autobot, Post, Comment } from '../models/index.js';
import { log, error } from '../utils/logger.js';

// Function to create Autobots, Posts, and Comments
export const createAutobot = async (req, res) => {
  try {
    log('Starting to create Autobots...');
    await createAutobotData();
    log('Finished creating Autobots.');
    res.status(201).json({ message: 'Autobots created successfully' });
  } catch (err) {
    error('Failed to create Autobots:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Function to get all Autobots without pagination
export const getAllAutobots = async (req, res) => {
  try {
    const autobots = await Autobot.findAll(); // Retrieve all Autobots without pagination
    res.json(autobots);
  } catch (err) {
    error('Failed to get all Autobots:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get Autobots with pagination
export const getAutobots = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const autobots = await Autobot.findAll({
      limit: 10,
      offset: page * 10
    });
    res.json(autobots);
  } catch (err) {
    error('Failed to get Autobots:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get a specific Autobot by ID
export const getAutobotById = async (req, res) => {
  const { id } = req.params;
  try {
    const autobot = await Autobot.findByPk(id, {
      include: {
        model: Post,
        include: [Comment]
      }
    });
    if (!autobot) {
      return res.status(404).json({ error: 'Autobot not found' });
    }
    res.json(autobot);
  } catch (err) {
    error('Failed to get Autobot by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Function to get a specific Autobot’s posts
export const getAutobotPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const autobot = await Autobot.findByPk(id, {
      include: { model: Post, include: [Comment] }
    });
    if (!autobot) {
      return res.status(404).json({ error: 'Autobot not found' });
    }
    res.json(autobot.Posts);
  } catch (err) {
    error('Failed to get Autobot posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get comments for a specific post
export const getPostComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId, {
      include: [Comment]
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post.Comments);
  } catch (err) {
    error('Failed to get post comments:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
