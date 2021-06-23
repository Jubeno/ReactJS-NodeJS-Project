const cron = require('node-cron');
const path = require('path');

const rmDir = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)

    for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
        else
            rmDir(filePath);
    }
};

cron.schedule('15 5 * * *', () => {
    console.log('Cronjob is running!!!');
    rmDir(path.join(__dirname, '/uploads'))
})