exports.isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      throw new Error("Unauthenticated");
    }
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
