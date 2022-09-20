const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.ACCESS_MONGODB);
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connect
};
