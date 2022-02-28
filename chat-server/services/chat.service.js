
const User = require('../models/User');

module.exports = {
    getUser: async (args) => {
        try{
            const user = await User.findOne(args);
            return user;
        }
        catch(error){
            return error;
        }
    },

    saveUser: async ({ username, password}) => {
        try{
            const newUser = await new User({ username, password}).save();
            return newUser;
        }
        catch(error){
            return error
        }
    }
}