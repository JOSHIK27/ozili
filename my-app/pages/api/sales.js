import { supabase } from "../../db/supabase";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      const { data, error } = await supabase
        .from("readystock_view2")
        .select("uniqueproductname, totalquantity");
      if (error) {
        throw error;
      }
      const products = body[1];
      let itemsquantity = 0;
      const shortages = [];
      for (const product of products) {
        itemsquantity = itemsquantity + parseInt(product.quantity);
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
      if (shortages.length > 0) {
        res.status(200).json(shortages);
      } else {
        const r = await supabase.from("salestbl").insert({
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
          dateofshipment: body[0].dateOfShipment
            ? body[0].dateOfShipment
            : null,
          dateofdelivery: body[0].dateOfDelivery
            ? body[0].dateOfDelivery
            : null,
          itemscount: products.length,
          itemsquantity: itemsquantity,
          shippingcharges: parseInt(body[0].shippingCharges),
        });
        if (!r.error) {
          const { data } = await supabase.from("salestbl").select();
          let temp = 0;
          data.forEach((item) => {
            if (temp < parseInt(item.saleid)) {
              temp = item.saleid;
            }
          });
          const id = temp;
          const salesItems = products.map((item) => ({
            saleid: parseInt(id),
            uniqueproductname: item.productName,
            customername: body[0].customerName,
            quantity: parseFloat(item.quantity),
            unitprice: parseFloat(item.unitPrice),
            totalprice: parseFloat(item.totalPrice),
            orderstatus: body[0].orderStatus,
          }));
          const { error } = await supabase
            .from("saleitemstbl")
            .insert(salesItems);
          res.json(["success"]);
        } else {
          throw r.error;
        }
      }
    } catch (err) {
      console.error("Error processing sale:", err);
      res.status(500).json({ success: false, err });
    }
  }
  if (req.method == "PUT") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      const r = await supabase
        .from("salestbl")
        .update({
          saledate: body[0].saledate,
          customername: body[0].customername,
          salemode: body[0].salemode,
          grossamount: parseFloat(body[0].grossamount),
          discountpercentage: parseFloat(body[0].discountpercentage),
          discountamount: parseFloat(body[0].discountamount),
          netamount: parseFloat(body[0].netamount),
          amountreceived: parseFloat(body[0].amountreceived),
          amountdue: parseFloat(body[0].amountdue),
          modeofpayment: body[0].modeofpayment,
          paymentrefnumber: body[0].paymentrefnumber,
          specialinstructions: body[0].specialinstructions,
          cargoprovider: body[0].cargoprovider,
          trackingnumber: body[0].trackingnumber,
          orderstatus: body[0].orderstatus,
          duedate: body[0].duedate ? body.duedate : null,
          saletype: body[0].saletype,
          dateofshipment: body[0].dateofshipment
            ? body[0].dateofshipment
            : null,
          dateofdelivery: body[0].dateofdelivery
            ? body[0].dateofdelivery
            : null,
          itemscount: parseInt(body[0].itemscount),
          itemsquantity: parseInt(body[0].itemsquantity),
          shippingcharges: parseInt(body[0].shippingcharges),
        })
        .eq("saleid", body[1]);
      if (r.error) throw r.error;
      const saleitems = await supabase
        .from("saleitemstbl")
        .select()
        .eq("saleid", body[1]);

      const updatedSaleItems =
        saleitems.data &&
        saleitems.data.map((item) => {
          return {
            ...item,
            orderstatus: body[0].orderstatus,
          };
        });
      const resp = await supabase
        .from("saleitemstbl")
        .update({ orderstatus: body[0].orderstatus })
        .eq("saleid", body[1]);
      if (resp.error) throw resp.error;
      res.status(200).json(["success"]);
    } catch (error) {
      res.status(500).json(r.error);
    }
  }
}
