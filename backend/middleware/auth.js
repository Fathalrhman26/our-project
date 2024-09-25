const jwt = require('jsonwebtoken');

/*module.exports = function(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied.');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = user;
        next();
    });
};*/

module.exports = function(req, res, next){
    const token = req.header('x-authMiddleware-token');
    if(!token) return
     res.status(401).json({msg:'no token authorization denied'});
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user=user.decoded;
    next();
    }catch  (err){
    res.status(401).json({msg:'token is not valid'});
    }

};

