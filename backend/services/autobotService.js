import axios from 'axios';
import { Autobot, Post, Comment } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

// Fetch data from JSONPlaceholder
const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url);
    console.log(`Fetched data from ${url}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Create Autobots, Posts, and Comments
const createAutobotData = async () => {
  console.log('Starting the creation of Autobots...');
  try {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
    console.log('Data fetched successfully from JSONPlaceholder.');

    // Create 500 unique Autobots
    for (let i = 0; i < 500; i++) {
      let user = users[i % users.length];
      let uniqueUsername = `${user.username}_${uuidv4()}`; // Use UUID to ensure uniqueness
      console.log(`Creating Autobot ${i + 1} with username ${uniqueUsername}`);

      try {
        const autbot = await Autobot.create({
          name: user.name,
          username: uniqueUsername,
          email: `${user.username}.${uuidv4()}@example.com`, // Ensure email uniqueness
          phone: user.phone,
          website: user.website,
          company: user.company,
          address: user.address
        });
        console.log(`Autobot ${i + 1} created successfully.`);

        // Create 10 posts for each Autobot
        for (let j = 0; j < 10; j++) {
          const postIndex = (i * 10 + j) % posts.length;
          const post = posts[postIndex];
          console.log(`Creating post ${j + 1} for Autobot ${i + 1}`);
          const newPost = await Post.create({
            title: `${post.title} - ${uuidv4()}`, // Ensure title uniqueness
            body: post.body,
            autbotId: autbot.id
          });
          console.log(`Post ${j + 1} created successfully.`);

          // Create 10 comments for each post
          for (let k = 0; k < 10; k++) {
            const commentIndex = (postIndex * 10 + k) % comments.length;
            const comment = comments[commentIndex];
            console.log(`Creating comment ${k + 1} for post ${j + 1}`);
            await Comment.create({
              body: comment.body,
              postId: newPost.id
            });
          }
        }
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          console.warn(`Duplicate entry detected for username ${uniqueUsername}. Skipping this entry.`);
        } else {
          console.error('An unexpected error occurred:', error);
          throw error;
        }
      }
    }
    console.log('Completed the creation of Autobots.');
  } catch (error) {
    console.error('Error creating Autobots, Posts, and Comments:', error);
    throw error;
  }
};

export { createAutobotData };
