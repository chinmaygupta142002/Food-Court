const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require('stripe')('sk_test_51PTZPr2MptQcuhNvQPpQ1Q7hlaKG0jQ2MxCJe52QwlMD2Wp5uXuInrpstGck4QrsunXHdLIpE9yndGITOOzzj6va00tC2Ccv0v');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const uri = "mongodb+srv://chinmaygupta14:chinmay14@cluster0.kr8lklo.mongodb.net/foodApp?retryWrites=true&w=majority&appName=Cluster0";

async function connectDb(){
    await mongoose.connect(uri);
    console.log("dB Connected");
}

connectDb();

const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String
})

const userModel = mongoose.model("users", userSchema);

const categorySchema = new mongoose.Schema({
    CategoryName: String
})


const foodSchema = new mongoose.Schema({
    CategoryName: String,
    name:String,
    img: String,
    options: Array, 
    description: String
})

const categoryModel = mongoose.model("categories", categorySchema);
    

const foodModel = mongoose.model("items", foodSchema);



app.post('/fetchPizzas', async(req, res) => {
    const pizzaData = await foodModel.find({CategoryName: "Pizza"});
    res.json(pizzaData);
})

app.post('/fetchBiryani', async(req, res) => {
    const biryaniData = await foodModel.find({CategoryName: "Biryani/Rice"});
    res.json(biryaniData);
})

app.post('/fetchStarters', async(req, res) => {
    const starterData = await foodModel.find({CategoryName: "Starter"});
    res.json(starterData);
})

app.post('/createUser', async(req, res) => {
    const newUser = new userModel({
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password
    })
    await newUser.save();
    res.json({success: true});
})

app.post('/findUser', async(req, res) => {
    await userModel.find({
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password
    }).then(
        result => {
            if(result.length){
                res.json({found: true})
            }
            else{
                res.json({found: false})
            }
        }
    )
})

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
            price: '{{req.body.totalAmount}}',
            quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
  
    res.redirect(303, session.url);
  });




app.listen(5000, () => {
    console.log("Server Running on port 5000");
});

