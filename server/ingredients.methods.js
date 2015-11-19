Meteor.methods({

    checkPath : function() {
        var Future=Npm.require("fibers/future");
        var exec = Meteor.npmRequire('child_process').exec;

        console.log("This is the root dir:");
        console.log(process.cwd()); // running from localhost returns: /Users/me/meteor_apps/test

        this.unblock();
        var future=new Future();
        var command="pwd";

        exec('ls -la ' + process.cwd() + '/../../../../../private/abbrv/', function(error, stdout, stderr) {
            // Fill in this callback with whatever you actually want to do with the information
            if(error !== null) {
                console.log('exec error: ' + error);
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            future.return(stdout.toString());

        });
        return future.wait();
    },

    loadIngredients : function () {
        console.log(JSON.parse(Assets.getText('abbrv/01001.json')));
    }

})