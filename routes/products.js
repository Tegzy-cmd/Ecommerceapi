const router = require('express').Router();

 const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

 router.post("/", verifyTokenAndAdmin,async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            return res.status(201).json(savedProduct);
        } catch (err) {
            return res.status(500).json(err);
        }
 })

//UPDATE
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate( req.params.id, {$set: req.body }, { new: true });
    return res.status(200).json(updatedUser);}
    catch (err) {
       return res.status(500).json(err);}
 });

//  //DELETE
//  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         return res.status(200).json("User has been deleted...");
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// }
// );

//GET Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET ALL PRODUCT
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.Category;
    try {
        let products;
        if(qNew){
        products = await Product.find().sort({createdAt: -1}).limit(1 )
        } else if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory],
                },
            });
        }
            else{
                products = await Product.find()
            }
        
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }

//     // GET USER STATS   
//     router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//         const date = new Date();
//         const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//         try {
//             const data = await User.aggregate([
//                 { $match: { createdAt: { $gte: lastYear } } },
//                 {
//                     $project: {
//                         month: { $month: "$createdAt" },
//                     },
//                 },
//                 {
//                     $group: {
//                         _id: "$month",
//                         total: { $sum: 1 },
//                     },
//                 },
//             ]);
//             return res.status(200).json(data);
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     });

// });

module.exports = router;