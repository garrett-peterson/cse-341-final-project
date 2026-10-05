const passport = require('passport');
const { Strategy: GitHubStrategy } = require('passport-github2');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const users = mongodb.getDatabase().db().collection('users');

    await users.updateOne(
      { githubId: profile.id },
      {
        $set: {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    const user = await users.findOne({ githubId: profile.id });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
