import axios from 'axios';
import { Autobot, Post, Comment } from '../models/index.js';

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
  console.log('Starting the creation of Autobots...'); // Log start of the process
  try {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users');
    const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
    console.log('Data fetched successfully from JSONPlaceholder.');
    // Create 500 unique Autobots
    for (let i = 0; i < 500; i++) {
      let user = users[i % users.length];
      let uniqueUsername = `${user.username}_${i}`;
      console.log(`Creating Autobot ${i + 1} with username ${uniqueUsername}`); // Log each Autobot creation
      try {
        const autbot = await Autobot.create({
          name: user.name,
          username: uniqueUsername,
          email: `${user.username}.${i}@example.com`, // Ensure email uniqueness
          phone: user.phone,
          website: user.website,
          company: user.company,
          address: user.address
        });
        console.log(`Autobot ${i + 1} created successfully.`); // Log successful creation
        // Create 10 posts for each Autobot
        for (let j = 0; j < 10; j++) {
          const postIndex = (i * 10 + j) % posts.length;
          const post = posts[postIndex];
          console.log(`Creating post ${j + 1} for Autobot ${i + 1}`); // Log each post creation
          const newPost = await Post.create({
            title: `${post.title} - ${i * 10 + j}`, // Ensure title uniqueness
            body: post.body,
            autbotId: autbot.id
          });
          console.log(`Post ${j + 1} created successfully.`); // Log successful creation

          // Create 10 comments for each post
          for (let k = 0; k < 10; k++) {
            const commentIndex = (postIndex * 10 + k) % comments.length;
            const comment = comments[commentIndex];
            console.log(`Creating comment ${k + 1} for post ${j + 1}`); // Log each comment creation
            await Comment.create({
              body: comment.body,
              postId: newPost.id
            });
          }
        }
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          // Handle the duplicate entry case
          console.warn(`Duplicate entry detected for username ${uniqueUsername}. Skipping this entry.`);
          // Optionally, you could perform additional actions here, such as modifying the username and retrying
        } else {
          // Handle other errors
          console.error('An unexpected error occurred:', error);
          throw error;  // Re-throw the error if it's not a unique constraint violation
        }
      }
    }
    console.log('Completed the creation of Autobots.'); // Log completion of the process
  } catch (error) {
    console.error('Error creating Autobots, Posts, and Comments:', error);
    throw error;
  }
};

// In autobotService.js
// console.log('Creating Autobots...');
// await createAutobotData();
// console.log('Autobots created');

export { createAutobotData };
