const CategoryModel = require("../models/Category");
const PositionModel = require("../models/Position");
const errorHandler = require("../utils/errorHandler");


module.exports.getAll = async (req, res) => {
    try{
        const categories = await CategoryModel.find({
            user:req.user.id,
        });
        res.status(200).json(categories);
    }
    catch(err){
        errorHandler(res, err);
    }    
}


module.exports.getById = async (req, res) => {
    try{
        const category = await CategoryModel.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(err){
        errorHandler(res, err);
    }    
}


module.exports.delete = async (req, res) => {
    try{
        await CategoryModel.remove({_id:req.params.id});
        await PositionModel.remove({category:req.params.id});
        res.status(200).json({"message":"category was deleted"});
    }
    catch(err){
        errorHandler(res, err);
    }    
}


module.exports.create = async (req, res) => {
    const category = new CategoryModel({
        name:req.body.name,
        user:req.user.id,
        imageSrc:req.file ? req.file.path : ""
    });

    try{
        await category.save();
        res.status(201).json(category);
    }
    catch(err){
        errorHandler(res, err);
    }    
}


module.exports.update = async (req, res) => {
    const updated = {
        name:req.body.name,
    };
    if (req.file){
        updated.imageSrc = req.file.path;
    }

    try{
        const category = await CategoryModel.findOneAndUpdate(
            {_id:req.params.id},
            {$set:updated},
            {new:true},
        );
        res.status(200).json(category);
    }
    catch(err){
        errorHandler(res, err);
    }    
}
