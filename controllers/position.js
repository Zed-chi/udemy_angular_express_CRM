const PositionModel = require("../models/Position");
const errorHandler = require("../utils/errorHandler");


module.exports.getByCategory = async (req, res) => {
    try{
        const positions = await PositionModel.find({
            "category":req.params.categoryId,
            "user":req.user.id,
        });
        res.status(200).json(positions);
    }
    catch(err){
        errorHandler(res, err);
    }
}


module.exports.delete = async (req, res) => {
    try{
        await PositionModel.remove({_id: req.params.id});
        res.status(200).json({"message":"position was deleted"});
    }
    catch(err){
        errorHandler(res, err);
    }
}


module.exports.create = async (req, res) => {
    try{
        const position = await new PositionModel({
            name:req.body.name,
            cost:req.body.cost,
            category:req.body.category,
            user:req.user.id,
        }).save();
        res.status(201).json(position);
    }
    catch(err){
        errorHandler(res, err);
    }
}


module.exports.update = async (req, res) => {
    try{
        const position = await PositionModel.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(position);
    }
    catch(err){
        errorHandler(res, err);
    }
}