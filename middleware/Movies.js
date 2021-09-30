module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json('Unauthorized')
    }
    const decode = token.split(" ")[1]
    if (decode === "FSMovies2021") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
