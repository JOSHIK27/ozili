import { supabase } from "@/db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      const {
        orderDate,
        receivedDate,
        invoiceNumber,
        supplierName,
        cargoProvider,
        freeShipping,
        cargoCharges,
        cargoPaidBySupplier,
        gstPaid,
        gstRate,
        amountPayableToSupplier,
        totalAmount,
        discount,
        items,
      } = body;

      const { data: insertedData, error } = await supabase
        .from("readymadetbl")
        .insert({
          orderdate: orderDate,
          receiveddate: receivedDate,
          invoicenumber: invoiceNumber,
          suppliername: supplierName,
          cargoprovider: cargoProvider,
          freeshipping: freeShipping,
          cargocharges: parseFloat(cargoCharges),
          cargopaidbysupplier: 0,
          gstpaid: gstPaid,
          gstrate: parseFloat(gstRate),
          amountpayabletosupplier: parseFloat(amountPayableToSupplier),
          totalamount: parseFloat(totalAmount),
          discount: parseFloat(discount),
        });
      console.log(insertedData);
      const resp = await supabase.from("readymadetbl").select();
      const lastInvoiceId = resp.data[resp.data.length - 1].readymadeid;
      console.log(lastInvoiceId);

      const itemPromises = items.map(async (item) => {
        const {
          fabric,
          productName,
          productCategory,
          printType,
          designCode,
          quantity,
          priceBeforeTax,
          priceAfterTax,
          lineTotal,
        } = item;

        const { error } = await supabase.from("readymadeitemstbl").insert({
          readymadeid: parseInt(lastInvoiceId),
          fabric,
          productname: productName,
          productcategory: productCategory,
          printtype: printType,
          designcode: designCode,
          quantity,
          pricebeforetax: priceBeforeTax,
          priceaftertax: priceAfterTax,
          linetotal: lineTotal,
        });
        console.log(error);
        if (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });

      await Promise.all(itemPromises);

      res.status(200).json(["success"]);
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
