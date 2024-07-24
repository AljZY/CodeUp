const User = require("../models/userSchema");
const Poser = require("../models/poserSchema");

const authMiddlewareUser = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Error in user authentication");
  }
};

const authMiddlewarePoser = async (req, res, next) => {
  try {
    const poserId = req.session.poserId;
    if (!poserId) return res.status(401).json({ message: "Unauthorized" });
    const poser = await Poser.findById(poserId);
    if (!poser) return res.status(401).json({ message: "Unauthorized" });
    req.poser = poser;
    next();
  } catch (err) {
    res.status(500).send("Error in poser authentication");
  }
};

module.exports = { authMiddlewareUser, authMiddlewarePoser };
