import Orders from "../models/Orders.js";

class OrderController {

    async index(req, res) {
        try {
            let orders = await Orders.find();
            res.status(200).json({message: "All orders", orders});
        } catch (error) {
            res.status(500).json({message: "Orders not found", error});
        }
    }

    async store(req, res) {
        try {
            let {productId, quantity, userId} = req.body;
            let totalOrder = await Orders.find({userId: userId, productId: productId}).countDocuments();
            if (totalOrder > 0) {
                let result = await Orders.findOneAndUpdate({userId: userId, productId: productId},
                    {$set: {quantity: quantity}});
                res.status(200).json({success: "Order updated successfully", result});

            } else {
                let order = new Orders({productId, quantity, userId});
                let result = await order.save();
                res.status(200).json({success: "Order created successfully", result});
            }


        } catch (error) {
            res.status(500).json({message: "Order not created", error});
        }
    }

    async show(req, res) {
        try {
            let {id} = req.params;
            let order = await Orders.findById(id).populate('productId').populate('userId');
            res.status(200).json({message: "Single order", order});
        } catch (error) {
            res.status(500).json({message: "Order not found", error});
        }
    }

    async confirm_order(req, res) {
        let id = req.body.id;
        let type = req.body.type;

        if (type === "cancel") {
            try {
                let order = await Orders.findByIdAndDelete(id);
                res.status(200).json({message: "cancelled"});
            } catch (error) {
                res.status(500).json({message: "Order not found", error});
            }
        }
        if (type === 'confirm') {
            await Orders.findByIdAndUpdate(id,
                {
                    $set:
                        {isConfirmed: true}
                });
            res.status(200).json({message: "confirmed"});

        }
    }

}

export default OrderController;