import express from "express";
import multer from "multer";
import Product from "../models/ProductModel.js";
const router = express.Router();
import uuidv4 from "uuid/v4.js";
import path from "path";

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + path.extname(file.originalname))
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.route('/add').post(upload.single('image'), (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const product_name = req.body.product_name;
  const brand = req.body.brand;
  const image = url + '/public/' + req.file.filename;
  const category = req.body.category;
  const item_price = req.body.item_price;
  const stock = req.body.stock;

  const newProductData = {
      product_name,
      brand,
      image,
      category,
      item_price,
      stock,
  }

  const newProduct = new Product(newProductData);

  newProduct.save()
         .then(() => res.json('Product Added'))
         .catch(err => res.status(400).json('Error: ' + err));
});


router.get("/view", async(req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.route("/edit/:id").put(upload.single('image'), (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  Product.findById(req.params.id)
  .then((product) => {
    product.product_name = req.body.product_name;
    product.brand = req.body.brand;
    product.image = url + '/public/' + req.file.filename;
    product.category = req.body.category;
    product.item_price = req.body.item_price;
    product.stock = req.body.stock;

    product
      .save()
      .then(() => res.json('Product Updated!'))
      .catch((error) => res.status(400).json(`Error: ${error}`));
  })
  .catch((error) => res.status(400).json(`Error: ${error}`));
});

router.post("/delete/:id", async(req, res) => {
  try {
    await Product.findOneAndDelete({_id: req.body.productId})
    res.status(200).json("Product Deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
