import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log(body);
    if (body.dyeType == "White" && body.movementType == "Out") {
      const { data } = await supabase
        .from("products")
        .select("component1, component2, component3")
        .eq("product", body.product);
      let c1 = false,
        c2 = false,
        c3 = false;
      console.log(data);
      if (data[0].component1) {
        const resp = await supabase
          .from("stilltodye_view")
          .select("rawinstock")
          .eq("component", data[0].component1);
        console.log(resp);
        if (resp.data[0].rawinstock < body.quantity) {
          c1 = true;
        }
      }
      if (data[0].component2) {
        const resp = await supabase
          .from("stilltodye_view")
          .select("rawinstock")
          .eq("component", data[0].component2);
        if (resp.data[0].rawinstock < body.quantity) {
          c2 = true;
        }
      }
      if (data[0].component3) {
        const resp = await supabase
          .from("stilltodye_view")
          .select("rawinstock")
          .eq("component", data[0].component3);
        if (resp.data[0].rawinstock < body.quantity) {
          c3 = true;
        }
      }
      if (c1 && c2 && c3) {
        res.json([data[0].component1, data[0].component2, data[0].component3]);
      } else if (c1 && c2) {
        res.json([data[0].component1, data[0].component2]);
      } else if (c2 && c3) {
        res.json([data[0].component2, data[0].component3]);
      } else if (c1 && c3) {
        res.json([data[0].component1, data[0].component3]);
      } else if (c1) {
        res.json([data[0].component1]);
      } else if (c2) {
        res.json([data[0].component2]);
      } else if (c3) {
        res.json([data[0].component3]);
      } else {
        try {
          const { data, error } = await supabase.from("jobworktbl").insert({
            date: body.date,
            supplier: body.name,
            printtype: body.workType,
            dyetype: body.dyeType,
            movement: body.movementType,
            fabric: body.fabric,
            product: body.product,
            quantity: parseInt(body.quantity),
            rollingrequired: body.rollingRequired,
            transaction: body.transaction,
            cargoprovider: body.cargoProvider,
            cargocharges: parseFloat(body.cargoCharges),
            additionalcharges: parseFloat(body.additionalCharges),
            cpubt: parseFloat(body.cpuBt),
            gstpaid: body.gstPaid,
            gstrate: parseFloat(body.gstRate),
            cpuat: parseFloat(body.cpuAt),
            netcost: parseFloat(body.net),
            cargopaidbysupplier: body.cargoPaidBySupplier,
            totalcost: parseFloat(body.totalCost),
            payabletosupplier: parseFloat(body.amountPaybleToSupplier),
            targetdate: body.targetDate,
          });
        } catch (error) {
          console.log(error.message);
        }
        res.json(["success"]);
      }
    } else if (body.dyeType != "White" && body.movementType == "Out") {
      const respone1 = await supabase
        .from("stilltoprint_view")
        .select(body.dyeType)
        .eq("product", body.product);
      if (
        respone1 &&
        respone1.data.length &&
        respone1.data[0][body.dyeType] >= parseInt(body.quantity)
      ) {
        const { data, error } = await supabase.from("jobworktbl").insert({
          date: body.date,
          supplier: body.name,
          printtype: body.workType,
          dyetype: body.dyeType,
          movement: body.movementType,
          fabric: body.fabric,
          product: body.product,
          quantity: parseInt(body.quantity),
          rollingrequired: body.rollingRequired,
          transaction: body.transaction,
          cargoprovider: body.cargoProvider,
          cargocharges: parseFloat(body.cargoCharges),
          additionalcharges: parseFloat(body.additionalCharges),
          cpubt: parseFloat(body.cpuBt),
          gstpaid: body.gstPaid,
          gstrate: parseFloat(body.gstRate),
          cpuat: parseFloat(body.cpuAt),
          netcost: parseFloat(body.net),
          cargopaidbysupplier: body.cargoPaidBySupplier,
          totalcost: parseFloat(body.totalCost),
          payabletosupplier: parseFloat(body.amountPaybleToSupplier),
          targetdate: body.targetDate,
        });
        res.json(["success"]);
      } else {
        res.json(["Quantity Insufficient"]);
      }
    } else if (body.movementType == "In") {
      console.log(body.supplier);
      const response1 = await supabase
        .from("stillinjbbysupplier_view")
        .select(body.dyeType)
        .eq("supplier", body.name)
        .eq("product", body.product);
      if (
        response1 &&
        response1.data.length &&
        response1.data[0][body.dyeType] >= parseInt(body.quantity)
      ) {
        await supabase.from("jobworktbl").insert({
          date: body.date,
          supplier: body.name,
          printtype: body.workType,
          dyetype: body.dyeType,
          movement: body.movementType,
          fabric: body.fabric,
          product: body.product,
          quantity: parseInt(body.quantity),
          rollingrequired: body.rollingRequired,
          transaction: body.transaction,
          cargoprovider: body.cargoProvider,
          cargocharges: parseFloat(body.cargoCharges),
          additionalcharges: parseFloat(body.additionalCharges),
          cpubt: parseFloat(body.cpuBt),
          gstpaid: body.gstPaid,
          gstrate: parseFloat(body.gstRate),
          cpuat: parseFloat(body.cpuAt),
          netcost: parseFloat(body.net),
          cargopaidbysupplier: body.cargoPaidBySupplier,
          totalcost: parseFloat(body.totalCost),
          payabletosupplier: parseFloat(body.amountPaybleToSupplier),
          targetdate: null,
        });
        res.json(["success"]);
      } else {
        res.json(["Quantity Insufficient"]);
      }
    }
  }
}
