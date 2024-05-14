// Importing necessary models and connection
import { connection } from './connect.js';
import Post from "./model/post-model.js";
import User from "./model/user-model.js";
import Admin from "./model/admin-model.js";
import Location from "./model/location-model.js";
import Notation from "./model/notation-model.js";

// Function to generate dummy data for each table
const generateDummyData = async () => {
  try {
    // Wait for the MongoDB connection to be established
    await connection;

    // Generate dummy data for users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        userName: `User${i + 1}`,
        phoneNum: `123456789${i}`,
        userImage: `user${i + 1}.jpg`,
        userEmail: `user${i + 1}@example.com`
      });
      users.push(user);
    }

    // Generate dummy data for admins
    const admins = [];
    for (let i = 0; i < 3; i++) {
      const admin = await Admin.create({
        adminLevel: "Admin",
        adminName: `Admin${i + 1}`,
        adminPassword: `admin${i + 1}123`
      });
      admins.push(admin);
    }

    // Generate dummy data for locations
    const locations = [];
    for (let i = 0; i < 3; i++) {
      const location = await Location.create({
        nationName: `Nation${i + 1}`,
        locationName: `Location${i + 1}`
      });
      locations.push(location);
    }

    // Generate dummy data for posts
    for (let i = 0; i < 50; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      await Post.create({
        postLocationId: randomLocation._id,
        postTag: `Tag${i + 1}`,
        postTitle: `Title${i + 1}`,
        postContent: `Content${i + 1}`,
        postAuthorId: randomUser._id,
        postImages: [`image${i + 1}.jpg`]
      });
    }

    // Generate dummy data for notations
    for (let i = 0; i < 10; i++) {
      const randomAdmin = admins[Math.floor(Math.random() * admins.length)];
      await Notation.create({
        notationName: `Notation${i + 1}`,
        notationContent: `Content${i + 1}`,
        adminId: randomAdmin._id,
        notationImages: [`notation${i + 1}.jpg`]
      });
    }

    console.log("Dummy data generated successfully!");
  } catch (error) {
    console.error("Error generating dummy data:", error);
  }
};

// Call the function to generate dummy data
generateDummyData();
