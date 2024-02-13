import { supabase } from "../../db/supabase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    console.log("Hii");
    const { data, error } = await supabase.from("customertbl").insert({
      nickname: body.nickname,
      customerfullname: body.customerfullname,
      primaryno: body.primaryno,
      secondaryno: body.secondaryno,
      source: body.source,
      referral: body.ifReferred,
      profession: body.profession,
      group: body.group,
      addressline1: body.addressline1,
      addressline2: body.addressline2,
      addressline3: body.addressline3,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      emailid: body.email,
    });
    console.log(error);
    res.json(["success"]);
  }
  if (req.method == "PUT") {
    const body = JSON.parse(req.body);
    const resp = await supabase
      .from("customertbl")
      .select("id")
      .eq("nickname", body.nickname);

    const { data, error } = await supabase
      .from("customertbl")
      .update({
        nickname: body.nickname,
        customerfullname: body.customerfullname,
        primaryno: body.primaryno,
        secondaryno: body.secondaryno,
        source: body.source,
        referral: body.ifReferred,
        profession: body.profession,
        group: body.group,
        addressline1: body.addressline1,
        addressline2: body.addressline2,
        addressline3: body.addressline3,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        emailid: body.email,
      })
      .eq("id", resp.data[0].id);
    res.json(["success"]);
  }
}
