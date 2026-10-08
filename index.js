require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./middleware/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Sesión + Passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

mongodb.initDB((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Swagger docs: http://localhost:${port}/api-docs`);
        });
    }
});