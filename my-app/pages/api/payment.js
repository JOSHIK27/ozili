import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  console.log(body);
  if (req.method == "POST") {
    const { data, error } = await supabase.from("paymentstbl").insert({
      transactiontype: body.transactionType,
      customername: body.personType == "Customer" ? body.customer : null,
      suppliername: body.personType == "Supplier" ? body.supplier : null,
      others: body.personType == "Others" ? body.others : null,
      contactnumber: body.contactNumber,
      amount: parseFloat(body.amount),
      paymentmethod: body.paymentMethod,
      date: body.dateOfPayment,
      account: body.account,
      referencenumber: body.referenceNumber,
      paymentcategory: body.paymentCategory,
      paymentdescription: body.paymentDescription,
      notes: body.notes,
    });
    res.json(["success"]);
  }
}
