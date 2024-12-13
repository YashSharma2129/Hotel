import connectMongo from '../../lib/mongodb';
import Post from '../../models/Post';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      await connectMongo();

      // Fetch all posts from MongoDB
      const posts = await Post.find();

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
