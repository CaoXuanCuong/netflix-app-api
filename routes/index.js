// import AuthRoute from './AuthRoute.js';
// import UserRoute from './UserRoute.js';
const AuthRoute = require('./AuthRoute');
const UserRoute = require('./UserRoute');
function route(app) {
    app.use('/api/auth', AuthRoute);
    app.use('/api/user', UserRoute);


}

// export default route;
module.exports = route;