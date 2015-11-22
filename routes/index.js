//var SessionHandler = require('../handlers/sessions');

module.exports = function(app, db){
    var simpleGit = require('simple-git')
    //var logWriter = require('../modules/logWriter')();
    //var models = require('../models/index')(db);
    //var cropsRouter = require('./crops')(db);
    //var notificationsRouter = require('./notifications')(db);
    //var usersRouter = require('./users')(db);
    //var marketeersRouter = require('./marketeers')(db);
    //var adminRouter = require('./admin')(db);
    //var pricesRouter = require('./prices')(db);
    //var statisticsRouter = require('./statistics')(db);
    //var importRouter = require('./import')(db);

    //var session = new SessionHandler(db);



    app.get('/', function(req, res, next){
        res.status(200).send( 'Express start succeed' );
    });

    app.get('/update', function(req, res, next){
        // update repo and when there are changes, restart the app
        require('simple-git')()
            .pull(function(err, update) {
                if(update && update.summary.changes) {
                    console.log('Update find, try to update end restart');
                    console.dir( update.summary.changes);
                    require('child_process').exec('npm restart');
                }
            });
        res.status(200).send( '333 2 ____Update and restart update ___33333' );
    });

    //app.use('/crops', session.isAuthenticatedUser, cropsRouter);
    //app.use('/notifications', notificationsRouter);
    //app.use('/users', usersRouter);
    //app.use('/marketeers',session.isAuthenticatedUser, marketeersRouter);
    //app.use('/admin', adminRouter);
    //app.use('/prices',session.isAuthenticatedUser,pricesRouter);
    //app.use('/statistics', statisticsRouter);
    //app.use('/importFromCsv', importRouter);

    function notFound(req, res, next){
        next();
    }

    function errorHandler( err, req, res, next ) {
        var status = err.status || 500;

        if( process.env.NODE_ENV === 'production' ) {
            if(status === 404 || status === 401){
                logWriter.log( '', err.message + '\n' + err.stack );
            }
            res.status( status );
        } else {
            if(status !== 401) {
                logWriter.log( '', err.message + '\n' + err.stack );
            }
            res.status( status ).send( err.message + '\n' + err.stack );
        }

        if(status === 401){
            console.warn( err.message );
        } else {
            console.error(err.message);
            console.error(err.stack);
        }
    }
    app.use( notFound );
    app.use( errorHandler );
};