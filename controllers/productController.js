const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
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

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
	const newData = products.filter((p) => p.id != req.params.id);
	fs.writeFile(`${__dirname}/../data/products.json`, JSON.stringify(newData), (err) => {
	  if (err) throw err;
		console.log("Record deleted.");
	});
	  
    res.status(200).json({		
      status: "success - Record deleted",
      data: {
        product: newData,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {  
    for(const i=0; i < products.length; i++){
      if(products[i].id == req.params.id){
        products[i].name = typeof req.body.name==="undefined" && !req.body.name?products[i].name:req.body.name;
        products[i].price = typeof req.body.price==="undefined" && !req.body.price?products[i].price:req.body.price;
        products[i].category = typeof req.body.category==="undefined" && !req.body.category?products[i].category:req.body.category;
        break;
      }
    }
	
    fs.writeFile(`${__dirname}/../data/products.json`, JSON.stringify(products), (err) => {
      if (err) throw err;
      console.log("Update record.");
    });

    res.status(200).jsonp({
      status: "success - Update record",
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
