import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    const resp1 = await supabase.from("salereturnstbl").insert({
      saleid: parseInt(body.orderId),
      customername: body.customerName,
      saledate: body.saleDate ? body.saleDate : null,
      reason: body.reason,
      actiontaken: body.actionTaken,
      refundmethod: body.refundMethod,
      refunddate: body.refundDate,
      charges: parseFloat(body.charges),
      returndate: body.returnDate,
      returnamount: parseFloat(body.returnAmount),
      remarks: body.remarks,
    });

    const { data } = await supabase.from("salereturnstbl").select();
    let temp = 0;
    data.forEach((item) => {
      if (temp < parseInt(item.returnid)) {
        temp = item.returnid;
      }
    });

    let returnItems = body.products.map((item) => {
      return {
        uniqueproductname: item.uniqueproductname,
        salequantity: parseInt(item.quantity),
        saleprice: parseFloat(item.unitprice),
        returnquantity: parseInt(item.return),
        returnid: parseInt(temp),
        linetotal: parseFloat(item.total),
        customername: body.customerName,
        saleid: parseInt(item.saleid),
      };
    });
    const { error } = await supabase
      .from("salereturnitemstbl")
      .insert(returnItems);
    if (!error) {
      res.json(["success"]);
    } else {
      res.json(["failed"]);
    }
  }
}
