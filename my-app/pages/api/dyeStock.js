import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    const r = await supabase.from("dyetbl").select();

    const { data, error } = await supabase.from("dyetbl").insert({
      date: body.date,
      fabric: body.fabricType,
      product: body.product,
      transaction: body.transaction,
      primarydyer: body.primaryDyer,
      secondarydyer: body.secondaryDyer,
      dyetype: body.dyeType,
      dyestyle: body.dyeStyle,
      quantity: parseInt(body.quantity),
      colorcombination: body.colorComb,
    });
    console.log(error);
    res.json(["success"]);
  }
}
