const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const Users = new Schema(
    {
        "email": String,
        "password": String
});