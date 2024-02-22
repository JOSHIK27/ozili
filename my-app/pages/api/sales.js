import { supabase } from "../../db/supabase";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    try {
      const { data, error } = await supabase
        .from("readystock_view2")
        .select("uniqueproductname, totalquantity");
      if (error) {
        throw error;
      }
      console.log(data);
      const products = body[1];
      const shortages = [];
      for (const product of products) {
        const availableProduct = data.find(
          (stock) => stock.uniqueproductname === product.productName
        );
        if (
          !availableProduct ||
          parseInt(product.quantity) > parseInt(availableProduct.totalquantity)
        ) {
          shortages.push({
            productName: product.productName,
            shortageQuantity:
              parseInt(product.quantity) -
              (availableProduct ? parseInt(availableProduct.totalquantity) : 0),
          });
        }
      }
      console.log(shortages);
      if (shortages.length > 0) {
        res.status(200).json(shortages);
      } else {
        await supabase.from("salestbl").insert({
          saledate: body[0].saleDate,
          customername: body[0].customerName,
          salemode: body[0].saleMode,
          grossamount: parseFloat(body[0].grossAmount),
          discountpercentage: parseFloat(body[0].discountByPercentage),
          discountamount: parseFloat(body[0].discountByAmount),
          netamount: parseFloat(body[0].netAmount),
          amountreceived: parseFloat(body[0].amountReceived),
          amountdue: parseFloat(body[0].amountDue),
          modeofpayment: body[0].modeOfPayment,
          paymentrefnumber: body[0].paymentRefNumber,
          specialinstructions: body[0].specialInstructions,
          cargoprovider: body[0].cargoProvider,
          trackingnumber: body[0].trackingNumber,
          orderstatus: body[0].orderStatus,
          duedate: body[0].dueDate ? body.dueDate : null,
          saletype: body[0].saleType,
        });
        const resp = await supabase.from("salestbl").select();
        const id = resp.data[resp.data.length - 1].saleid;
        const salesItems = products.map((item) => ({
          saleid: parseInt(id),
          uniqueproductname: item.productName,
          customername: body[0].customerName,
          quantity: parseFloat(item.quantity),
          unitprice: parseFloat(item.unitPrice),
          totalprice: parseFloat(item.totalPrice),
        }));
        const { error } = await supabase
          .from("saleitemstbl")
          .insert(salesItems);
        res.json(["success"]);
      }
    } catch (err) {
      console.error("Error processing sale:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
}
