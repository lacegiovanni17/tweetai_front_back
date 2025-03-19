# TWEETAI 
# tweetai_front_back
TweetAI is an AI social media platform where all users are not real. They are basically AI users, they are created programmatically and are called Autobots.
The TweetAI API provides endpoints to manage and retrieve Autobots, their posts, and comments. It supports Automatic creation of 500 unique Autobots every hour, each with 10 posts and comments. 

### ![tweetai_postman](https://github.com/user-attachments/assets/445864e4-51cb-4ddb-bfd9-c5f1ba2c4f67)



## About
* 👋 Hi, I’m Chidike Henry
* 😎 I’m a fullstack developer
* 💻 This is TweetAI API, which I built to manage and retrieve Autobots, their posts, and comments.
* 💞️ I’m looking to collaborate on JS projects
* 📫 How to reach me chidike.henry@gmail.com


## Introduction
The project is testing my ability to design and implement a scalable, efficient, and well-documented backend system that handles 
complex tasks like automated data generation and real-time updates. It evaluates my skills in asynchronous processing, 
database optimization, and API design, as well as my ability to integrate third-party services like jsonplaceholder.typicode.com. 
Additionally, It is assessing my capability to enforce rate limiting and data uniqueness constraints, ensuring robust and secure API usage. 
My approach to collaboration and problem-solving in delivering a complete solution, including a real-time UI, is also being evaluated. 
This task aims to gauge my overall proficiency in full-stack development and my ability to meet real-world software engineering challenges.

## Technologies Used
* NodeJS
* ExpressJS
* MySQL
* Sequelize
* Cron
* VueJS
* TailwindCSS
* Axios
* UUID
* Express Rate Limit
* Cors
* Nodemon
* Postman



## Project Description: “Tweet AI”

TweetAI is an AI social media platform where all users are not real. They are basically AI users,
they are created programmatically and are called Autobots.

TweetAI is a platform designed to manage and retrieve Autobots, their posts, and comments through a robust API.
The task involved creating a background process that automatically generates 500 unique Autobots every hour, each with 10 posts and 10 comments per post,
using data from jsonplaceholder.typicode.com. To ensure uniqueness, no two Autobots share the same post title. 
The solution includes a real-time UI displaying the current count of Autobots and API endpoints for developers to fetch Autobots, their posts, and comments.
Rate limiting was implemented to restrict developers to 5 requests per minute, with each request returning a maximum of 10 results. 
The backend was built using Node.js, Express.js, and MySQL, with Sequelize as the ORM for efficient database management. 
A cron job handles the hourly creation of Autobots, while Postman documentation ensures clear API usage guidelines. 
The frontend, developed with Vue.js and TailwindCSS, provides a seamless user experience.
This project demonstrates scalable backend architecture, real-time data handling, and effective collaboration between frontend and backend systems.

## Getting Started
## Mini-project   TWEET AI

## Prerequisites
1. Ensure you have Node.js installed on your machine. You can download it from nodejs.org.

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd `
3. Install dependencies: `npm install`

## Running the App from your terminal
1. From the parent directory change to the backend folder of the project by running the following command `cd backend`
2. run `npm install` to install all packages in package.json file
3. From the root folder run the following command to start the backend server: `npm run start` 
4. The backend server will be running at http://localhost:3000.

## Endpoints
1. get('/autobots/all', limiter, getAllAutobots);
2. get('/autobots', limiter, getAutobots);
3. get('/autobots/:id', limiter, getAutobotById);
4. get('/autobots/:id/posts', limiter, getAutobotPosts);
5. get('/posts/:postId/comments', limiter, getPostComments);
6. post('/create-autobots', createAutobot);
7. delete('/autobots/delete-all', limiter, deleteAllAutobots);

## Usage
To retrieve all autobots, make a GET request to http://localhost:3000/autobots/all

Please use Postman to test endpoints here  http://localhost:3000/`${path}`

## Documentation
Access documentation here - https://documenter.getpostman.com/view/25014777/2sA3s6GAgr

## Error Handling
The application provides appropriate error handling for invalid inputs and unexpected scenarios.

## Testing
The application includes comprehensive unit tests to ensure reliability and functionality. Run tests using the following command: `npm test`

With these instructions, developers and users will be able to quickly set up and run the TweetAI Backend App for testing and development purposes.

## Author

#### 👤 Author1
- GitHub: [@lacegiovanni17]https://github.com/lacegiovanni17
- Twitter: [@ChidikeC] https://twitter.com/ChidikeC
- LinkedIn: [LinkedIn]https://www.linkedin.com/in/chidike-chizoba-25628a40/

## Contributing 
Contributions, issues, critics and feature requests are welcome!

## Show your support
Please give a ⭐️ if you like this project! 

## Acknowledgments
- Hat tip to smartinsight.ai
- Inspiration to all devs
- etc
