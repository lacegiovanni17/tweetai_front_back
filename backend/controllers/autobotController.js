import { createAutobotData } from '../services/autobotService.js';
import { Autobot, Post, Comment } from '../models/index.js';
import { log, error } from '../utils/logger.js';
import { sequelize } from '../models/index.js'; // Adjust the import path according to your project structure

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
    const totalAutobots = autobots.length; // Get the total number of Autobots

    // Log the total number of Autobots to the console
    console.log(`Total number of Autobots: ${totalAutobots}`);

    // Respond with the Autobots and the total count
    res.json({
      success: true,
      message: `Total number of Autobots: ${totalAutobots}`,
      data: autobots,
    });
  } catch (err) {
    console.error('Failed to get all Autobots:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get Autobots with pagination
export const getAutobots = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0; // Current page number
    const limit = 10; // Number of Autobots per page

    // Retrieve Autobots for the current page
    const autobots = await Autobot.findAll({
      limit: limit,
      offset: page * limit,
    });

    // Get the total count of Autobots
    const totalAutobots = await Autobot.count();

    // Log the total number of Autobots and Autobots per page to the console
    console.log(`Total number of Autobots: ${totalAutobots}`);
    console.log(`Number of Autobots on page ${page}: ${autobots.length}`);

    // Respond with the Autobots, the total count, and the count for the current page
    res.json({
      success: true,
      message: `Fetched ${autobots.length} Autobots on page ${page} out of ${totalAutobots} total Autobots.`,
      data: {
        autobots,
        currentPage: page,
        perPage: autobots.length,
        totalAutobots,
      },
    });
  } catch (err) {
    console.error('Failed to get Autobots:', err);
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
    // Fetch the Autobot along with its posts and comments
    const autobot = await Autobot.findByPk(id, {
      include: { model: Post, include: [Comment] }
    });

    // Check if Autobot exists
    if (!autobot) {
      return res.status(404).json({ error: 'Autobot not found' });
    }

    // Log the number of posts
    const numberOfPosts = autobot.Posts.length;
    console.log(`Autobot with ID ${id} has ${numberOfPosts} posts.`);

    // Respond with the posts and the count
    res.json({
      posts: autobot.Posts,
      numberOfPosts
    });
  } catch (err) {
    console.error('Failed to get Autobot posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Function to get comments for a specific post
export const getPostComments = async (req, res) => {
  const { postId } = req.params;
  try {
    // Find the post and include its comments
    const post = await Post.findByPk(postId, {
      include: [Comment]
    });

    // If the post is not found, return a 404 error
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Get the total number of comments for the post
    const totalComments = post.Comments.length;

    // Log the total number of comments to the console
    console.log(`Post with ID ${postId} has ${totalComments} comments.`);

    // Return the comments and the total count in the response
    res.json({
      comments: post.Comments,
      totalComments: totalComments
    });

  } catch (err) {
    // Log the error if something goes wrong
    console.error('Failed to get post comments:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete all Autobots, Posts, and Comments
export const deleteAllAutobots = async () => {
  try {
    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    await Comment.truncate();
    console.log('All comments deleted.');

    await Post.truncate();
    console.log('All posts deleted.');

    // Enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Continue with the deletion of Autobots...
    console.log('All Autobots deleted.');
  } catch (error) {
    console.error('Failed to delete all Autobots, Posts, and Comments:', error);
  }
};
