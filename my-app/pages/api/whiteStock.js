import {supabase} from '../../db/supabase'

export default async function handler(
    req,
    res
) {
    if(req.method == "POST") {
        const body = JSON.parse(req.body);
        try {
            const { error } = await supabase
            .from('stock-records')
            .insert({
                fabric: body.fabric,
                supplier: body.supplier,
                orderDate: body.orderDate,
                deliveryDate: body.orderDate,
                quantity: parseInt(body.quantity),
                price: parseInt(body.price),
                subProduct: body.subProduct,
                productType: body.productType,
                cut: body.cut,
            })
            res.json(["success"]);
        }
        catch(error) {
            res.json(["faced some error"]);
        }
    }
} 