import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log("this is body", body);
    if (
      body.wastage &&
      parseFloat(body.wastageQuantity) > parseFloat(body.quantityAvailable)
    ) {
      res.json(["Quantity Insufficient"]);
    } else if (
      body.wastage &&
      parseFloat(body.wastageQuantity) <= parseFloat(body.quantityAvailable)
    ) {
      await supabase
        .from("subFabricCut")
        .update({
          metersAvailable:
            parseFloat(body.quantityAvailable) -
            parseFloat(body.wastageQuantity),
        })
        .eq("subFabric", body.subFabric);
      res.json(["success"]);
    } else if (
      parseFloat(body.metersCut) > parseFloat(body.quantityAvailable)
    ) {
      res.json(["Quantity Insufficient"]);
    } else {
      console.log("adding in db");
      const resp = await supabase.from("cuttbl").insert({
        date: body.date,
        fabric: body.fabric,
        subfabric: body.subFabric,
        productcomponent: body.productComponent,
        meters: parseFloat(body.metersCut),
        componentquantity: parseFloat(body.quantityCut),
        cutby: body.cutBy,
      });
      res.json(["success"]);
    }
  }
}
