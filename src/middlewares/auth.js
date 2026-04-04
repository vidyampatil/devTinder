// Middleware for admin authentication
const adminAuth = (req, res, next) => {
    const token = 'xyz';
    const isAuthrized = token === 'xyz'
    if(!isAuthrized){
        res.status(401).send('unauthrized request')
    }else{
        next();
    }
};

module.exports = {
    adminAuth
};