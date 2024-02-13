import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  console.log(body);
  if (req.method == "POST") {
    const { data, error } = await supabase.from("preorderstbl").insert({
      customername: body.customerName,
      orderdate: body.orderDate,
      expecteddeliverydate: body.expectedDeliveryDate,
      targetdeliverydate: body.targetDeliveryDate,
      productname: body.productName,
      printtype: body.printType,
      quantity: parseInt(body.quantity),
      unitprice: parseInt(body.unitPrice),
      instructions: body.instructions,
      paymentstatus: body.paymentStatus,
      orderstatus: body.orderStatus,
    });
    res.json(["success"]);
  }
}
