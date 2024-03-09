import { supabase } from "../../db/supabase";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
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
        additionalCharges,
        items,
      } = body;
      const r = await supabase.from("whitestocktbl").insert({
        orderdate: orderDate,
        receiveddate: receivedDate,
        invoicenumber: invoiceNumber,
        suppliername: supplierName,
        cargoprovider: cargoProvider,
        freeshipping: freeShipping,
        cargocharges: parseFloat(cargoCharges),
        cargopaidbysupplier: cargoPaidBySupplier,
        gstpaid: gstPaid,
        gstrate: parseFloat(gstRate),
        amountpayabletosupplier: parseFloat(amountPayableToSupplier),
        totalamount: parseFloat(totalAmount),
        discount: parseFloat(discount),
        additionalcharges: parseFloat(additionalCharges),
      });
      console.log(r.error);
      if (!r.error) {
        const { data } = await supabase.from("whitestocktbl").select();
        let temp = 0;
        data.forEach((item) => {
          if (temp < parseInt(item.whiteid)) {
            temp = item.whiteid;
          }
        });
        const id = temp;
        let products = items;
        const stockitems = products.map((item) => ({
          whiteid: parseInt(id),
          fabric: item.fabric,
          subfabric: item.subFabric,
          quantity: parseFloat(item.quantity),
          units: item.units,
          pricebeforetax: item.cpubt,
          priceaftertax: item.priceAfterTax,
          linetotal: parseFloat(item.lineTotal),
          suppliername: supplierName,
          netprice: parseFloat(item.netPrice),
        }));
        const { error } = await supabase
          .from("whiteitemstbl")
          .insert(stockitems);
        console.log(error);
        res.json(["success"]);
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
