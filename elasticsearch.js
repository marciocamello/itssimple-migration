//Uso: node --max-old-space-size=1024 --expose-gc elasticsearch.js --index=<INDICE DO ELASTIC SEARCH>
var fs = require("fs"),
    argv = require('optimist').argv,
    exec = require('child_process').exec,
    MongoServer = require('mongodb');

exec("cpulimit -p "+process.pid+" -l 50");
var settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json"));
var index = (argv.index) ? argv.index : "itssimple";

MongoServer.connect(settings.mongodb, function(err, db){
    db.collection("groups").count({}, function(error, numOfDocs){
        pull(db, 0, numOfDocs);
    });
});

function pull(db, p, total){
    //Criando indice de todos os grupos
    db.collection("groups").find({}, {_id: 1, title: 1}).skip(p).limit(1000).toArray(function(error, docs){
        if(docs.length > 0){
            for(var key in docs){
                var url = "curl -XPUT http://localhost:9200/"+index+"/"+docs[key]._id+" -d '"+JSON.stringify({
                    _id: docs[key]._id,
                    title: docs[key].title,
                    type: "group"
                })+"'";
                
                //if(argv.debug)
                    console.log(url);
                    
                exec(url);
            }
            
            setTimeout(function(){
                global.gc();
                pull(db, p+1000, total);
            }, 2000);
        }
        else{
            console.log("Migração concluida");
            process.exit(1);
        }
    });
}