
const User = require('../models/User');

module.exports = {
    async getUser (args, ...config) {
        try{
            const user = await User.findOne(args, ...config);
            return user;
        }
        catch(error){
            return error;
        }
    },

    async saveUser ({ username, password}) {
        try{
            const newUser = await new User({ username, password}).save();
            return newUser;
        }
        catch(error){
            return error
        }
    }
}