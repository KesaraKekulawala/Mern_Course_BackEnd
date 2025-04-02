import Product from "../models/product.js";

export async function getProducts(req, res) {
    //Product.find().then((data) => {
    //    res.json(data);
    //});
    try {
        const products = await Product.find();
        res.json(products);
        
    } catch (err) {
        res.json({
            message: "Error getting products",
            error: err
        })
    }
}

export function saveProduct(req, res) { 
       console.log(req.user);

       console.log(req.body);

       if(req.user == null){
        res.status(403).json({
            message:"Unauthorized"

        })
        return
       }

       if(req.user.role != "admin"){
        res.status(403).json({
            message:"Unauthorized"
        })
        return
       }
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })
    product.save().then(() => {
        res.json({
            message: "Product added successfully"
        });
    }).catch(() => {
        res.json({
            message: "Error adding product"
        });
    });
}