import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Sequelize with database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Define Autobot model
const Autobot = sequelize.define('Autobot', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.JSON,
    allowNull: false
  },
  address: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Define Post model
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  autbotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Autobot,
      key: 'id'
    }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Define Comment model
const Comment = sequelize.define('Comment', {
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'id'
    }
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Define relationships
Autobot.hasMany(Post, { foreignKey: 'autbotId' });
Post.belongsTo(Autobot, { foreignKey: 'autbotId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export { sequelize, Autobot, Post, Comment };
