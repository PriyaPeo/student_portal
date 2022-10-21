const mongoos=require('mongoose')

function connectdb(){
    mongoos.connect('mongodb://Priya:16189251@ac-ci3zgzi-shard-00-00.zmhswki.mongodb.net:27017,ac-ci3zgzi-shard-00-01.zmhswki.mongodb.net:27017,ac-ci3zgzi-shard-00-02.zmhswki.mongodb.net:27017/?ssl=true&replicaSet=atlas-dutbha-shard-0&authSource=admin&retryWrites=true&w=majority')
        .then(() => console.log("connected"))
        .catch(error => console.log(error))
}

module.exports=connectdb