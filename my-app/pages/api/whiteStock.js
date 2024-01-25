import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      const resp = await supabase.from("whiteStock").insert({
        orderDate: body.orderDate,
        deliveryDate: body.deliveryDate,
        invoiceNumber: body.invoiceNumber,
        supplier: body.supplier,
        fabric: body.fabric,
        subFabric: body.subProduct,
        units: body.productType,
        quantity: parseFloat(body.quantity),
        cargoProvider: body.cargoProvider,
        cargoCharges: parseFloat(body.cargoCharges),
        freeShipping: body.freeShipping,
        gstPaid: body.gstPaid,
        gstRate: parseFloat(body.gstRate),
        additionalCharges: parseFloat(body.additionalCharges),
        cpuBT: parseFloat(body.cpuBt),
        cpuAT: parseFloat(body.cpuAt),
        net: body.net,
        totalCost: body.totalCost,
        cargoPaidBySupplier: body.cargoPaidBySupplier,
        amountPayableToSupplier: body.amountPaybleToSupplier,
      });
      let rs = await supabase.from("whiteStock").select("id");

      if (body.productType == "Meters") {
        // const { data, error } = await supabase
        //   .from("subFabricCut")
        //   .select()
        //   .eq("subFabric", body.subProduct);
        // const res = await supabase
        //   .from("subFabricCut")
        //   .update({
        //     metersAvailable:
        //       data[0].metersAvailable + parseFloat(body.quantity),
        //   })
        //   .eq("subFabric", data[0].subFabric);
        const { data, error } = await supabase.from("subFabricCut").insert({
          subFabric: body.subProduct,
          metersAvailable: parseFloat(body.quantity),
          id: rs.data[rs.data.length - 1].id,
        });
      } else {
        const ress = await supabase.from("subFabricUnCut").insert({
          id: rs.data[rs.data.length - 1].id,
          subFabric: body.subProduct,
          quantity: parseFloat(body.quantity),
        });

        const { data, error } = await supabase
          .from("components")
          .select()
          .eq("productComponent", body.subProduct);

        await supabase
          .from("components")
          .update({
            availableQuantity:
              data[0].availableQuantity + parseInt(body.quantity),
          })
          .eq("productComponent", body.subProduct);
        console.log("pieces added");
      }
      res.json(["success"]);
    } catch (error) {
      res.json(["faced some error"]);
    }
  }
}
