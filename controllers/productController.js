const fs = require("fs");
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
};

exports.getProductById = async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

//ELIMINA UN DATO EXISTENTE DA ERROR SI NO LO ENCUENTRA
exports.deleteProductById = async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct.length > 0) {
    const query = { _id: req.params.id };
    const products = await Product.deleteOne(query);
    res.status(200).json({		
      status: "success - Record deleted",
      data: {
        product: products,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.updateProductById = async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {  
    var myquery = { _id: req.params.id };
    var newvalues = { $set: {
                              productName: req.body.productName==="undefined"?foundProduct.productName:req.body.productName, 
                              price: req.body.price==="undefined"?foundProduct.price:req.body.price, 
                              description: req.body.description==="undefined"?foundProduct.description:req.body.description, 
                            } 
                    };
    const options = { };
    Product.findByIdAndUpdate(myquery,newvalues, function(err, result){
      if(err){
          res.send(err)
      }
      else{
          res.send(result)
      }

    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};