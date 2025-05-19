const router = require('express').Router();
const Cart = require('../models/Cart');


 const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
//CREATE
 router.post("/", verifyToken,async (req, res) => {
        const newCart = new Product(req.body);
        try {
            const savedCart = await newCart.save();
            return res.status(201).json(savedCart);
        } catch (err) {
            return res.status(500).json(err);
        }
 })

//UPDATE
router.put("/:id",verifyTokenAndAuthorization, async (req, res) => {
    
    try {
        const updatedCart = await Cart.findByIdAndUpdate( req.params.id, {$set: req.body }, { new: true });
    return res.status(200).json(updatedCart);}
    catch (err) {
       return res.status(500).json(err);}
 });

 //DELETE
 router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
       const cart = await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json("cart has been deleted...");
    } catch (err) {
        return res.status(500).json(err);
    }
}
);

//GET Cart
router.get("/find/:userid",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userid });
        return res.status(200).json(cart);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET ALL 
router.get("/",verifyTokenAndAdmin, async (req, res) => {
   try {
        const carts = await Cart.find();    
        return res.status(200).json(carts);
   } catch (error) {
       return res.status(500).json(err);
    
   }
});


module.exports = router;