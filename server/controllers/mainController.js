/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    const locals = {
        title: 'Home',
        description: 'Parse logo from page url'
    };

    res.render('index', locals);
};

/**
 * POST /
 * Logo Parse
 */
exports.logoParse = async (req, res) => {
    const locals = {
        title: 'Logo Parser',
        description: 'Parse logo from page url',
        url: req.body.url
    };

    res.render('logo-parse', locals);
};