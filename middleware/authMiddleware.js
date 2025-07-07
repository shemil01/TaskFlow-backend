const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    req.user = decoded;    
    console.log("loginned:",req.user)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};


const adminMiddleware = async (req, res, next) => {
  // const token = req.cookies.token;
  const user = await User.findById(req.user.id);
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
