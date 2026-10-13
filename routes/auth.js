const router = require('express').Router();
const passport = require('../middleware/passport');
const { requiresAuth } = require('../middleware/authenticate');

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  (req, res) => res.redirect('/')
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Ruta de prueba: sin sesión da 401, con sesión devuelve el usuario
router.get('/whoami', requiresAuth, (req, res) => {
  res.json({ user: req.user });
});

router.get('/failure', (req, res) =>
  res.status(401).json({ error: 'Login failed' })
);

module.exports = router;