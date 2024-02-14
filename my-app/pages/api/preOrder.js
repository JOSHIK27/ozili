import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

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
  if (req.method == "PUT") {
    console.log("this is body", body);
    const { data, error } = await supabase
      .from("preorderstbl")
      .update({
        customername: body.customerName,
        orderdate: body.orderDate,
        expecteddeliverydate: body.expectedDeliveryDate,
        targetdeliverydate: body.targetDeliveryDate,
        productname: body.productName,
        printtype: body.printType,
        quantity: parseInt(body.quantity),
        unitprice: parseInt(body.amount),
        instructions: body.instructions,
        paymentstatus: body.paymentStatus,
        orderstatus: body.orderStatus,
      })
      .eq("id", parseInt(body.id));
    console.log(error);
    res.json(["success"]);
  }
  if (req.method == "DELETE") {
    const { data, error } = await supabase
      .from("preorderstbl")
      .delete()
      .eq("id", parseInt(body.id));
    console.log(error);
    res.json(["success"]);
  }
}
