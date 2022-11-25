const Product = require('../models/Product.js')

const getProducts = ((req, res) => {
    Product.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({msg: error}))
})

const getProduct = ((req, res) => {
    console.log(req)
    Product.findOne({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Product not found'}))
})

const getProductLocal = (product) => {
    var productLocal;
    var error;
    Product.findOne({ _id: product.id })
        .then(result => console.log(result))
        .catch((e) => console.log(e) )
    return {productLocal, error}
}

console.log(getProductLocal({id:"2"}))

const createProduct = ((req, res) => {
    Product.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateProduct = ((req, res) => {
    Product.findOneAndUpdate({ _id: req.params.productID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

const deleteProduct = ((req, res) => {
    Product.findOneAndDelete({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Product not found' }))
})

module.exports = {
    getProducts,
    getProduct,
    getProductLocal,
    createProduct,
    updateProduct,
    deleteProduct
}
