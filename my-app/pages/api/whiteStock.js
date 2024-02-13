import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    try {
      const { data, error } = await supabase.from("whitestocktbl").insert({
        orderdate: body.orderDate,
        receiveddate: body.deliveryDate,
        invoicenumber: body.invoiceNumber,
        supplier: body.supplier,
        fabric: body.fabric,
        subfabric: body.subProduct,
        units: body.productType,
        quantity: parseFloat(body.quantity),
        cargoprovider: body.cargoProvider,
        cargocharges: parseFloat(body.cargoCharges),
        freeshipping: body.freeShipping,
        gstpaid: body.gstPaid,
        gstrate: parseFloat(body.gstRate),
        additionalcharges: parseFloat(body.additionalCharges),
        cpubt: parseFloat(body.cpuBt),
        cpuat: parseFloat(body.cpuAt),
        netcost: parseFloat(body.net),
        totalcost: parseFloat(body.totalCost),
        cargopaidbysupplier: body.cargoPaidBySupplier,
        payabletosupplier: parseFloat(body.amountPaybleToSupplier),
      });
      console.log(error);
      res.json(["success"]);
    } catch (error) {
      res.json(["faced some error"]);
    }
  }
}
