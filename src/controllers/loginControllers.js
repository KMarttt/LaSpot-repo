let getLoginPage = (req, res) => {
    return res.send("Hello login form controller page");
};

module.exports = {
    getLoginPage: getLoginPage
};