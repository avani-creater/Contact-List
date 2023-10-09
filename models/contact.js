const mongoose=require('mongoose');
const contactShema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});
const Contact=mongoose.model('Contact',contactShema);
module.exports=Contact;