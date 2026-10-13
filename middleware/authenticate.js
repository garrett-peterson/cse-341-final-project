// Middleware de autorización: exige sesión válida para continuar.
const requiresAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};

module.exports = { requiresAuth };