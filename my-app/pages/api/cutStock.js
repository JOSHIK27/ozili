import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    if (
      body.wastage &&
      parseFloat(body.wastageQuantity) > parseFloat(body.quantityAvailable)
    ) {
      res.json(["Quantity Insufficient"]);
    } else if (
      body.wastage &&
      parseFloat(body.wastageQuantity) <= parseFloat(body.quantityAvailable)
    ) {
      const resp = await supabase.from("cutstocktbl").insert({
        date: body.date,
        fabric: body.fabric,
        subfabric: body.subFabric,
        component: body.productComponent,
        quantitycut: 0,
        compquantity: 0,
        cutby: body.cutBy,
        wastage: parseFloat(body.wastageQuantity),
      });
      res.json(["success"]);
    } else if (
      parseFloat(body.metersCut) > parseFloat(body.quantityAvailable)
    ) {
      res.json(["Quantity Insufficient"]);
    } else {
      const resp = await supabase.from("cutstocktbl").insert({
        date: body.date,
        fabric: body.fabric,
        subfabric: body.subFabric,
        component: body.productComponent,
        quantitycut: parseFloat(body.metersCut),
        compquantity: parseFloat(body.quantityCut),
        cutby: body.cutBy,
        wastage: parseFloat(body.wastageQuantity),
      });
      res.json(["success"]);
    }
  }
}
