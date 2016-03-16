var fs = require("fs"),
    MongoServer = require("mongodb").MongoClient;

var settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json"));

MongoServer.connect(settings.mongodb, function(err, db){
    if(err){ console.log("Erro ao tentar conexão com banco de dados do It's Simple"); process.exit(1); }
    else{ 
        //Lojas
        db.createCollection("stores");

        //Categorias
        db.createCollection("categories");
        //db.collection("categories").createIndex({key: 1}, function(){});
        db.collection("categories").createIndex({parents: 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("categories").createIndex({associete: 1}, function(err, result){ if(err) console.log(err); else console.log(result); });
        db.collection("categories").createIndex({characteristics: 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("categories").createIndex({key: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("categories").createIndex({original: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        
        //Grupos
        db.createCollection("groups");
        db.collection("groups").createIndex({"title": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("groups").createIndex({"barcode": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("groups").createIndex({"isbn": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("groups").createIndex({"model": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("groups").createIndex({"products": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("groups").createIndex({"isbn": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("groups").createIndex({"barcode": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("groups").createIndex({"model": 1}, function(){});
        //db.collection("groups").createIndex({"brand": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("groups").createIndex({"characteristics": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("groups").ensureIndex({title: "text"}, { language_override: "portuguese" }, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("groups").createIndex({model: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("groups").createIndex({brand: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        
        //Produtos
        db.createCollection("products");
        db.collection("products").createIndex({"price": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products").createIndex({"isbn": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products").createIndex({"store": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products").createIndex({"sku": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products").createIndex({"barcode": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("products").createIndex({"model": 1}, function(){});
        //db.collection("products").createIndex({"brand": 1}, function(){});
        db.collection("products").createIndex({"characteristics": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products").createIndex({title: "text"}, { language_override: "portuguese" }, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products").createIndex({"title": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("products").createIndex({breadcrumb_original: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("products").createIndex({breadcrumb: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("products").createIndex({brand: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("products").createIndex({model: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});

        //Caracteriscas dos produtos
        //db.createCollection("products_characteristics");
        db.collection("products_characteristics").createIndex({"key": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products_characteristics").createIndex({"values": 1}, function(err, result){ if(err) console.log(err); else console.log(result);});
        //db.collection("products_characteristics").createIndex({key: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
        db.collection("products_characteristics").createIndex({name: "text"}, function(err, result){ if(err) console.log(err); else console.log(result);});
                
        //setTimeout(function(){ console.log("Banco criado com sucesso"); process.exit(1); },3000);
    }
});  