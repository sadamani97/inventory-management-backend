export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
};
//# sourceMappingURL=error.middleware.js.map