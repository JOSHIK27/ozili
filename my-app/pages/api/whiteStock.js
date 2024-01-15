import { supabase } from "../../db/supabase";


export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    try {
      const { error } = await supabase.from("whiteStock").insert({
        orderDate: body.orderDate,
        deliveryDate: body.deliveryDate,
        invoiceNumber: body.invoiceNumber,
        supplier: body.supplier,
        fabric: body.fabric,
        subFabric: body.subProduct,
        units: body.productType,
        quantity: parseInt(body.quantity),
        cargoProvider: body.cargoProvider,
        cargoCharges: parseInt(body.cargoCharges),
        freeShipping: body.cargoPaidBySupplier,
        gstPaid: !body.gstPaid,
        gstRate: parseInt(body.gstRate),
        additionalCharges: parseInt(body.additionalCharges),
        cpuBT: parseInt(body.cpuBt),
        cpuAT: body.cpuAt,
        net: body.net,
        totalCost: body.totalCost,
      });
      if (body.productType == "Meters") {
        const { data, error } = await supabase
          .from("subFabricCut")
          .select()
          .eq("subFabric", body.subProduct);
        const res = await supabase
          .from("subFabricCut")
          .update({
            metersAvailable:
              data[0].metersAvailable + parseFloat(body.quantity),
          })
          .eq("subFabric", data[0].subFabric);
        console.log("hi there");
      }
      res.json(["success"]);
    } catch (error) {
      res.json(["faced some error"]);
    }
  }
}
