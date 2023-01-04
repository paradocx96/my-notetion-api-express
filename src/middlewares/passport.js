import User from '../models/User';

const {APP_SECRET} = require('../constants');
const {Strategy, ExtractJwt} = require('passport-jwt');
const logger = require("../utils/logger");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: APP_SECRET
}

module.exports = passport => {
    try {
        passport.use(new Strategy(options, async (payload, done) => {
            await User.findById(payload.user_id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, false);
                }).catch(err => {
                    logger.info("Passport Find User - Error: ", err);
                    return done(null, false);
                });
        }));
    } catch (err) {
        logger.info("Passport Configuration - Error: ", err);
    }
};
