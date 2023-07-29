exports.isAdmin = function (req, res, next) {
  try {
    if (req.user.type === "Admin") {
      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
