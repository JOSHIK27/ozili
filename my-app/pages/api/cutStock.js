import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    if (
      body.wastage &&
      parseFloat(body.wastageQuantity) >
        parseFloat(body.quantityAvailable[0].stilltocut)
    ) {
      res.json(["Quantity Insufficient"]);
    } else if (
      body.wastage &&
      parseFloat(body.wastageQuantity) <=
        parseFloat(body.quantityAvailable[0].stilltocut)
    ) {
      const resp = await supabase.from("cutstocktbl").insert({
        cutdate: body.date,
        subfabric: body.subFabric,
        component: body.productComponent,
        quantitycut: 0,
        compquantity: 0,
        cutby: body.cutBy,
        wastage: parseFloat(body.wastageQuantity),
      });
      res.json(["success"]);
    } else if (
      parseFloat(body.metersCut) >
      parseFloat(body.quantityAvailable[0].stilltocut)
    ) {
      res.json(["Quantity Insufficient"]);
    } else {
      const { data, error } = await supabase.from("cutstocktbl").insert({
        cutdate: body.date,
        subfabric: body.subFabric,
        component: body.productComponent,
        quantitycut: parseFloat(body.metersCut),
        compquantity: parseFloat(body.componentQuantity),
        cutby: body.cutBy,
        wastage: parseFloat(body.wastageQuantity),
      });
      console.log(error);
      res.json(["success"]);
    }
  }
}
