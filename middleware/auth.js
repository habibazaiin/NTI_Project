// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // 👈 هنا يحط { id, role }
    next();
  });
}

function isUser(req, res, next) {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Only users allowed' });
  }
  next();
}

module.exports = { authenticateToken, isUser };
