import { supabase } from "../../db/supabase";


export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    try {
      const resp = await supabase.from("whitestocktbl").insert({
        orderdate: body.orderDate,
        deliverydate: body.deliveryDate,
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
        net: parseFloat(body.net),
        totalcost: parseFloat(body.totalCost),
        cargopaidbysupplier: body.cargoPaidBySupplier,
        amountpayabletosupplier: parseFloat(body.amountPaybleToSupplier),
      });
      // let rs = await supabase.from("whitestock").select("id");

      // if (body.productType == "Meters") {
      //   const { data, error } = await supabase.from("subFabricCut").insert({
      //     subFabric: body.subProduct,
      //     metersAvailable: parseFloat(body.quantity),
      //     id: rs.data[rs.data.length - 1].id,
      //   });
      // } else {
      //   const ress = await supabase.from("subFabricUnCut").insert({
      //     id: rs.data[rs.data.length - 1].id,
      //     subFabric: body.subProduct,
      //     quantity: parseFloat(body.quantity),
      //   });

      //   const { data, error } = await supabase
      //     .from("components")
      //     .select()
      //     .eq("productComponent", body.subProduct);

      //   await supabase
      //     .from("components")
      //     .update({
      //       availableQuantity:
      //         data[0].availableQuantity + parseInt(body.quantity),
      //     })
      //     .eq("productComponent", body.subProduct);
      //   console.log("pieces added");
      // }
      res.json(["success"]);
    } catch (error) {
      res.json(["faced some error"]);
    }
  }
}
