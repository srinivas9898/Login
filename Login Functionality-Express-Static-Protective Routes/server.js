let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null,"uploads");
    },
    filename: (req, file, cb) => {
        console.log(file);
      cb(null, `${Date.now}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    password:String,
    email:String,
    age:Number,
    mobileNo:String,
    profilePic:String,
});

let User = new mongoose.model("user",userSchema);

app.post("/register",upload.single("profilePic"), async(req, res)=>{
    console.log(req.file);

    console.log(req.body);
   try{
       
     let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        age:req.body.age,
        email:req.body.email,
        mobileNo:req.body.mobileNo,
        profilePic:req.file.path,
     });    

    await User.insertMany([newUser]);
      res.json({status:"success",msg:"User Created Successfully"});

   }catch(err){
       res.json({status:"failure",msg:"Unable to create usre",err:err});
   }
});

app.post("/login", upload.none(), async(req,res)=>{
  console.log(req.body);

  let userDetailsArr = await User.find().and({emial:req.body.email});
  
  if(userDetailsArr.length > 0){
    if(userDetailsArr[0].password == req.body.password){

      let loggedInUserDetails = {
        firstName:userDetailsArr[0].firstName,
        lastName:userDetailsArr[0].lastName,
        age:userDetailsArr[0].age,
        email:userDetailsArr[0].email,
        profilePic:userDetailsArr[0].profilePic,
      };

        res.json({status:"success",data:loggedInUserDetails});
    }else{
      res.json({status:"failure",msg:"Invaid Password"});
    }
    

  }else{
    res.json({status:"failure",msg: "User doesnot exist"});
  }

});

app.listen(4567,()=>{
    console.log("Listening tp port 4567");
});


let connectToMDB = async ()=>{

try{
    await mongoose.connect("mongodb://localhost:27017/srinivas");
    console.log("Connected to MDB Successfuly");
}catch(err) {
   console.log("Unable to connect to MDB");
}

    
};

connectToMDB();