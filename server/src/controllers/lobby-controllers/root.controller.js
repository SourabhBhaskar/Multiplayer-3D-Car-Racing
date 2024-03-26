const path = require('path');


function rootController(req, res){
    const zips = path.join(__dirname, '..', '..', 'assets', 'zips');
    const file = path.join(zips, 'client-lobby.zip');
    res.sendFile(file);
}


module.exports = rootController;