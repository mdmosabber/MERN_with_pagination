const Product = require("../models/Product")


// Create Product
exports.store = async (req, res)=> {
    try {
       const newProduct =  new Product(req.body);
       const product = await newProduct.save();
       res.status(200).json({status: 'success', data: product})
    } catch (error) {
        return res.status(400).json(error);
    }
}


//Read Product
exports.view = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: 'success', datas: products });
    } catch (error) {
        return res.status(400).json(error);
    }
};




//Update Product
exports.update = async(req, res)=> {
    try {
        const product = await Product.findById(req.params.id);

        product.name        = req.body.name || product.name;
        product.image       = req.body.image || product.image;
        product.code        = req.body.code || product.code;
        product.unitPrice   = req.body.unitPrice || product.unitPrice;
        product.qty         = req.body.qty || product.qty;  
        product.totalPrice  = req.body.totalPrice || product.totalPrice;  

        const updateProduct = await product.save();
    
        res.status(200).json({status: 'success', data: updateProduct})
        
    } catch (error) {
        return res.status(400).json(error); 
    }
}



//Delete Product
exports.destroy = async (req, res)=> {
    try {
       const product = await Product.findByIdAndDelete(req.params.id);
    
        res.status(200).json({status: 'success', data: product})

    } catch (error) {
        return res.status(400).json(error); 
    }
}


//Get Product By ID
exports.edit = async(req,res)=> {
   try {
    const product = await Product.findById(req.params.id);
    
    res.status(200).json({status: 'success', data: product})

   } catch (error) {
    return res.status(400).json(error); 
   }
}


exports.prouctList = async(req, res)=> {
    try {
        
       let pageNo = Number(req.params.pageNo);
       let perPage = Number(req.params.perPage);
       let searchValue = req.params.searchKey;
       const skipRow = (pageNo - 1) * perPage;
       let data;
       
       if(searchValue !== '0'){
            let SearchRgx = {"$regex": searchValue, "$options": "i"};
            let SearchQuery = {$or: [{name: SearchRgx}, {code: SearchRgx}, {unitPrice: SearchRgx}, {totalPrice: SearchRgx} ]};

            data = await Product.aggregate([{
                $facet:{
                    Total:[{$match: SearchQuery},{$count: 'count'}],
                    Rows: [{$match: SearchQuery}, {$skip: skipRow }, {$limit: perPage}]
                }
            }])
       }else{
        data = await Product.aggregate([{
            $facet:{
                Total:[{$count: 'count'}],
                Rows: [{$skip: skipRow }, {$limit: perPage}]
            }
        }])
       }

       res.status(200).json({status: "success", data})

    } catch (error) {
        return res.status(400).json(error); 
    }
}