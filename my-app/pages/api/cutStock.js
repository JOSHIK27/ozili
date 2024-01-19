import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
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
      const { data, error } = await supabase
        .from("components")
        .select("availableQuantity")
        .eq("productComponent", body.productComponent);
      await supabase
        .from("components")
        .update({
          availableQuantity:
            data[0].availableQuantity + parseFloat(body.quantityCut),
        })
        .eq("productComponent", body.productComponent);

      await supabase
        .from("subFabricCut")
        .update({
          metersAvailable:
            parseFloat(body.quantityAvailable) - parseFloat(body.metersCut),
        })
        .eq("subFabric", body.subFabric);
      res.json(["success"]);
    }
  }
}
