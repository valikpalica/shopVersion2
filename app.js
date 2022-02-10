const express = require('express');
const app = express();
const cors = require('cors');
const startDB = require('./DB/sequelize/sync');
const {app_config} = require('./config.json');
const router = require('./router/router');
const path = require('path');


process.on('SIGTERM',()=>{
    app.close(()=>{
        console.log('server has been terminated');
    });
});

try {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(express.static(path.join(__dirname,'public')));
    app.use('/',router);
    app.listen(app_config.port,()=>{
        console.log('server started');
        startDB().then(res=>{
            console.log(`App started with status ${res}`);
        }).catch(e=>{
           throw Error(`Error with App ${e}`);
        })
    });
} catch (error) {
    process.kill(process.pid, 'SIGTERM')
}