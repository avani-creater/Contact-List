const express=require('express');
const path=require('path');
const port=3000;
const app=express();
const db=require('./config/mongoose');
const Contact=require('./models/contact');
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'assets')));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
console.log("directory name", __dirname);
app.use(express.urlencoded());

// app.use(express.urlencoded());
// app.use(express.static('assets'));
// app.use(function(req,res,next){
// console.log("middleware one");
// next();
// })
// app.use(function(req,res,next){
//     console.log("middleware two");
//     next();
// })

// contact list array

var contactList=[
    {
        name:"Anjali",
        phone:4954903458,
    },
   {
    name:"Kajal",
    phone:5895829809,
   },
   {
    name:"Anshu",
    phone:5948908049,
   }
]
app.get('/',async function(req,res){
    try{

    let contacts= await Contact.find({});
   
        return res.render('index',{
            title :"My contact list",
            contact_list:contacts
    });
    }

    catch(err){

        console.log('error in fatching data from database');
    }
});

app.get('/practice',function(req,res){
return res.render('practice',{
title:"let play with ejs"
});
})

app.post('/create-contact', async function(req,res){
    try{
    // contactList.push(
    //     {
    //         name:req.body.name,
    //         phone:req.body.phone
    //     }
    // );
    // contactList.push(req.body);
    // console.log(req.body);
    let newContact=await Contact.create({
name:req.body.name,
phone:req.body.phone
    });

        console.log(' my ans ', newContact);
        return res.redirect('/');
    }
    catch(err){
            console.log('error in creating a contact !,',err);
            return;     
               }
}
    );

app.get('/delete-contact/', async function(req,res){ 

    try{   //why i need to put it as get method instead of post

    console.log(req.query);
    let id=req.query.id;
   let Contacts = await Contact.findByIdAndDelete(id);
        // if(err){
        //     console.log('error in deleting an object from database');
        //     return;
        // }
        return res.redirect('back');
    }

        catch(err){

            console.log('error in deleting the contact');
        }
    }
    );

    // let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    //    if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    //    }
app.listen(port,function(err){
    if(err){
        console.log('error message ', err);
    }
    else
    console.log(`Yup ! My first exrpess server is running on port ${port}`);
});