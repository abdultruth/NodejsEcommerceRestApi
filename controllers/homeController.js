const Home = function(req, res, next) {
    
    res.send('i am cool dear')
    next();
}

module.exports = Home;