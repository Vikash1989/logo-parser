const axios = require('axios');
const cheerio = require('cheerio');
// const url = require('url');

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
    const url = req.body.url;
    let isError = false;
    
    // Function to extract the primary brand logo from a website URL
    async function extractLogo(url) {
        try {
            // Fetch the HTML content of the website
            const response = await axios.get(url);
            const html = response.data;
        
            // Load the HTML content into cheerio for parsing
            const $ = cheerio.load(html);
        
            // Find the logo image element using a CSS selector
            const logoElement = $('img[src*="logo"], img[alt*="logo"]').first();
        
            // Extract the logo image URL
            let logoUrl = logoElement.attr('src');
            if (!logoUrl) {
              logoUrl = logoElement.attr('data-src');
            }

            if (logoUrl && !logoUrl.startsWith('https')) {
                const baseUrl = new URL(url);
                logoUrl = new URL(logoUrl, baseUrl).href;
            }
        
            return logoUrl;
        } catch (error) {
            isError = true;
            console.error('Error:', error);
        }
    }

    let logoURL = await extractLogo(url);

    const locals = {
        title: 'Logo Parser',
        description: 'Parse logo from page url',
        url: url,
        isError: isError,
        logoURL: logoURL
    };

    res.render('logo-parse', locals);
};