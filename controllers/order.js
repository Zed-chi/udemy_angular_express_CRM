const OrderModel = require("../models/Order");
const errorHandler = require("../utils/errorHandler");


/* GET: localhost:5000/api/order/order?offset=2&limit=5 */
module.exports.getAll = async (req, res) => {
    const query = {
        user:req.user.id,
    };
    if (req.query.start) {
        query.date = {
            $gte:req.query.start
        };
    }
    if (req.query.end) {
        if (!query.date) { query.date = {}; }
        query.date["$lte"] = req.query.end;
    }

    if (req.query.order) {
        query.order = Number(req.query.order);

    }

    try {
        const orders = await OrderModel
        .find(query)
        .sort({date:-1})
        .skip(Number(req.query.offset))
        .limit(Number(req.query.limit));

        res.status(200).json(orders);
    }
    catch(err){
        errorHandler(res, err);
    }
};


module.exports.create = async (req, res) => {
    try{
        const lastOrder = await OrderModel.findOne({user:req.user.id}).sort({date:-1});
        const maxOrder = lastOrder ? lastOrder.order : 0;
        const order = await new Order({
            "order":maxOrder + 1,
            "list":req.body.list,
            "user":req.user.id,
        }).save();
        res.status(201).json(order);
    }
    catch(err){
        errorHandler(res, err);
    }
};