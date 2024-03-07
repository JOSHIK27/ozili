import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobState } from "@/store/states";
import { useRecoilState } from "recoil";
import { supabase } from "@/db/supabase";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const handleTargetDate = (e, job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;

  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate: e.target.value,
  });
};

const handleCPUAT = (e, job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt: e.target.value,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  });
};
const handleCPUBT = (e, job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  let val =
    parseFloat(e.target.value) * (parseFloat(gstRate) / 100 + 1) +
    (parseFloat(cargoCharges) + parseFloat(additionalCharges)) /
      parseFloat(quantity);

  let tot = val * parseFloat(quantity);
  let afterTax = parseFloat(e.target.value) * (gstRate / 100 + 1);

  let temp = tot;
  if (!cargoPaidBySupplier) {
    temp = temp - cargoCharges;
  }
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt: e.target.value,
    gstPaid,
    gstRate,
    cpuAt: afterTax,
    net: val,
    cargoPaidBySupplier,
    totalCost: tot,
    amountPaybleToSupplier: temp,
    targetDate,
  });
};

const handleAdditionalCharges = (e, job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  let val =
    parseFloat(cpuBt) * (parseFloat(gstRate) / 100 + 1) +
    (parseFloat(cargoCharges) + parseFloat(e.target.value)) /
      parseFloat(quantity);
  let tot = val * parseFloat(quantity);
  let afterTax = parseFloat(cpuBt) * (parseFloat(gstRate) / 100 + 1);
  let temp = tot;
  if (!cargoPaidBySupplier) {
    temp = temp - cargoCharges;
  }
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges: e.target.value,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt: afterTax,
    net: val,
    cargoPaidBySupplier,
    totalCost: tot,
    amountPaybleToSupplier: temp,
    targetDate,
  });
};

const handleCargoCharges = (e, job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  let val =
    cpuBt * (gstRate / 100 + 1) +
    (parseFloat(e.target.value) + parseFloat(additionalCharges)) /
      parseFloat(quantity);
  let tot = val * parseFloat(quantity);
  let aftertax = cpuBt * (gstRate / 100 + 1);
  let temp = tot;
  if (!cargoPaidBySupplier) {
    temp = temp - e.target.value;
  }
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges: e.target.value,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt: aftertax,
    net: val,
    cargoPaidBySupplier,
    totalCost: tot,
    amountPaybleToSupplier: temp,
    targetDate,
  });
};

const handleCargoPaidBySupplier = (job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  let t;
  if (cargoPaidBySupplier == true) {
    t = false;
    amountPaybleToSupplier = totalCost - cargoCharges;
  } else {
    t = true;
    amountPaybleToSupplier = totalCost;
  }
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier: t,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  });
};

const handleCargoProvider = (e, job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider: e,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  });
};

const handleGstRate = (e, job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  let val =
    parseFloat(cpuBt) * (parseFloat(e.target.value) / 100 + 1) +
    (parseFloat(cargoCharges) + parseFloat(additionalCharges)) /
      parseFloat(quantity);
  let tot = val * parseFloat(quantity);
  let afterTax = parseFloat(cpuBt) * (parseFloat(e.target.value) / 100 + 1);
  let temp = tot;
  if (!cargoPaidBySupplier) {
    temp = temp - cargoCharges;
  }
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate: e.target.value,
    cpuAt: afterTax,
    net: val,
    cargoPaidBySupplier,
    totalCost: tot,
    amountPaybleToSupplier: temp,
    targetDate,
  });
};

const handleGst = (job, setJob) => {
  let {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  let val = net;
  let tot = totalCost;
  let afterTax = cpuAt;
  let temp = amountPaybleToSupplier;
  if (gstPaid == true) {
    const element = document.getElementById("gst");
    (element.value = 0), (gstPaid = false), (gstRate = 0);
    val =
      parseFloat(cpuBt) +
      (parseFloat(cargoCharges) + parseFloat(additionalCharges)) /
        parseFloat(quantity);
    tot = val * parseFloat(quantity);
    afterTax = parseFloat(cpuBt);
    temp = tot;
    if (!cargoPaidBySupplier) {
      temp = temp - cargoCharges;
    }
  } else {
    gstPaid = true;
  }
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt: afterTax,
    net: val,
    cargoPaidBySupplier,
    totalCost: tot,
    amountPaybleToSupplier: temp,
    targetDate,
  });
};

const handleSubmit = (job, setJob) => {
  if (typeof document !== "undefined") {
    console.log(document.getElementById("submitButton"));
  }
  if (job.movementType == "In") {
    if (!job.date) {
      alert("Enter the date");
      return;
    }
    if (!job.name) {
      alert("Enter name");
      return;
    }
    if (!job.workType) {
      alert("Enter Work Type");
      return;
    }
    if (!job.dyeType) {
      alert("Enter Dye Type");
      return;
    }
    if (!job.movementType) {
      alert("Enter Movement Type");
      return;
    }
    if (!job.fabric) {
      alert("Enter Fabric Details");
      return;
    }
    if (!job.product) {
      alert("Enter Product Name");
      return;
    }
    if (!job.quantity) {
      alert("Enter Quantity Printed");
      return;
    }
    if (!job.transaction) {
      alert("Enter Transaction Type");
      return;
    }
    if (job.gstPaid == true && !job.gstRate) {
      alert("Enter GST Rate");
      return;
    }
    if (!job.cargoProvider) {
      alert("Enter the details of Cargo Provider");
      return;
    }
    if (!job.additionalCharges) {
      alert("Enter value of Additional Charges");
      return;
    }
    if (!job.cpuBt) {
      alert("Enter the value of Cost Per Unit Before Tax");
      return;
    }
  } else {
    if (!job.date) {
      alert("Enter the date");
      return;
    }

    if (!job.name) {
      alert("Enter name");
      return;
    }
    if (!job.workType) {
      alert("Enter Work Type");
      return;
    }
    if (!job.dyeType) {
      alert("Enter Dye Type");
      return;
    }
    if (!job.movementType) {
      alert("Enter Movement Type");
      return;
    }
    if (!job.targetDate) {
      alert("Entet the Target Date");
      return;
    }
    if (!job.fabric) {
      alert("Enter Fabric Details");
      return;
    }
    if (!job.product) {
      alert("Enter Product Name");
      return;
    }
    if (!job.quantity) {
      alert("Enter Quantity Printed");
      return;
    }
    if (!job.transaction) {
      alert("Enter Transaction Type");
      return;
    }
    if (job.movementType == "Out" && job.dyeType == "White") {
      if (job.workType == "Screen Blend" || job.workType == "Print Damage") {
        alert(
          "When the dye type is White, print type cannot be " + job.workType
        );
        return;
      }
    }
  }
  if (typeof document !== "undefined") {
    document.getElementById("submitButton").disabled = true;
  }

  fetch("../api/jobStock", {
    method: "POST",
    body: JSON.stringify(job),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((x) => {
      document.getElementById("submitButton").disabled = false;
      if (x[0] == "success") {
        window.location.reload();
        alert("Added to db");
      } else if (x[0] == "Quantity Insufficient") {
        alert("Quantity Insufficient");
      } else {
        const c1 = x[0],
          c2 = x[1],
          c3 = x[2];
        if (c1 && c2 && c3) {
          alert(c1 + c2 + c3 + " are insufficient");
        } else if (c1 && c2) {
          alert(c1 + " and " + c2 + " are insufficient");
        } else if (c2 && c3) {
          alert(c2 + " and " + c3 + " are insufficient");
        } else if (c1 && c3) {
          alert(c1 + " and " + c3 + " are insufficient");
        } else if (c1) {
          alert(c1 + " is insufficient");
        } else if (c2) {
          alert(c2 + " is insufficient");
        } else if (c3) {
          alert(c3 + " is insufficient");
        }
      }
    });
};

const handleDate = (e, job, setJob) => {
  const { date, ...rest } = job;
  setJob({
    date: e.target.value,
    ...rest,
  });
};

const handleJobWorkerName = (e, job, setJob) => {
  const { date, name, ...rest } = job;
  setJob({
    date,
    name: e,
    ...rest,
  });
};

const handleWorkType = (e, job, setJob) => {
  const { date, name, workType, ...rest } = job;
  setJob({
    date,
    name,
    workType: e,
    ...rest,
  });
};

const handleDyeType = (e, job, setJob) => {
  const { date, name, workType, dyeType, ...rest } = job;
  setJob({
    date,
    name,
    workType,
    dyeType: e,
    ...rest,
  });
};

const handleMovementType = (e, job, setJob) => {
  const { date, name, workType, dyeType, movementType, ...rest } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType: e,
    ...rest,
  });
};

const handleFabric = async (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    ...rest
  } = job;
  const { data, error } = await supabase
    .from("products")
    .select("product")
    .eq("fabric", e);
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric: e,
    productList: data,
    ...rest,
  });
};

const handleProduct = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    ...rest
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product: e,
    ...rest,
  });
};

const handlePrintType = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    ...rest
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType: e,
    ...rest,
  });
};

const handleQuantity = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt,
    net,
    cargoPaidBySupplier,
    totalCost,
    amountPaybleToSupplier,
    targetDate,
  } = job;
  let val =
    parseFloat(cpuBt) * (parseFloat(gstRate) / 100 + 1) +
    (parseFloat(cargoCharges) + parseFloat(additionalCharges)) /
      parseFloat(e.target.value);
  let tot = val * parseFloat(e.target.value);
  let aftertax = parseFloat(cpuBt) * (parseFloat(gstRate) / 100 + 1);
  let temp = tot;
  if (!cargoPaidBySupplier) {
    temp = temp - cargoCharges;
  }

  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity: e.target.value,
    rollingRequired,
    transaction,
    cargoProvider,
    cargoCharges,
    additionalCharges,
    cpuBt,
    gstPaid,
    gstRate,
    cpuAt: aftertax,
    net: val,
    cargoPaidBySupplier,
    totalCost: tot,
    amountPaybleToSupplier: temp,
    targetDate,
  });
};

const handleRollingRequired = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    ...rest
  } = job;
  let val = rollingRequired;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired: !val,
    ...rest,
  });
};
const handleTransaction = (e, job, setJob) => {
  const {
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction,
    ...rest
  } = job;
  setJob({
    date,
    name,
    workType,
    dyeType,
    movementType,
    fabric,
    productList,
    product,
    printType,
    quantity,
    rollingRequired,
    transaction: e,
    ...rest,
  });
};
export default function JobWork({
  fabric,
  dyeType,
  printType,
  jobWorkType,
  names,
  cargoProviders,
}) {
  const [job, setJob] = useRecoilState(jobState);
  const [btn, setBtn] = useState(false);

  return (
    <div className="bg-[#efecec] p-8 rounded-lg">
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/ios-filled/50/lawyer.png"
          alt="lawyer"
        />
        <h1 className="text-2xl">JOBWORK FORM</h1>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Movement Type</h1>
        <Select
          onValueChange={(e) => {
            handleMovementType(e, job, setJob);
          }}
        >
          <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"Out"}>Out</SelectItem>
            <SelectItem value={"In"}>In</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm">Job Work Date</h1>
        <input
          onChange={(e) => {
            handleDate(e, job, setJob);
          }}
          type="date"
          className="bg-white border-[1px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
        />
      </div>
      {job.movementType == "Out" && (
        <div className="mb-[10px] ">
          <h1 className="text-sm">Target Date</h1>
          <input
            onChange={(e) => {
              handleTargetDate(e, job, setJob);
            }}
            type="date"
            className="bg-white border-[1px] rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
          />
        </div>
      )}
      <div className=" mb-[10px]">
        <h1 className="text-sm">Job Worker Name</h1>
        <Select
          onValueChange={(e) => {
            handleJobWorkerName(e, job, setJob);
          }}
        >
          <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {names?.map((x) => {
              return (
                <SelectItem key={x.supplier} value={x.supplier}>
                  {x.supplier}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Work Type</h1>
        <Select
          onValueChange={(e) => {
            handleWorkType(e, job, setJob);
          }}
        >
          <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {printType?.map((x) => {
              return (
                <SelectItem key={x.printtype} value={x.printtype}>
                  {x.printtype}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Dye Type</h1>
        <Select
          onValueChange={(e) => {
            handleDyeType(e, job, setJob);
          }}
        >
          <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {dyeType?.map((x) => {
              return (
                <SelectItem key={x.dyetype} value={x.dyetype}>
                  {x.dyetype}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className=" mb-[10px]">
        <h1 className="text-sm">Fabric</h1>
        <Select
          onValueChange={(e) => {
            handleFabric(e, job, setJob);
          }}
        >
          <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {fabric?.map((x) => {
              return (
                <SelectItem key={x.fabric} value={x.fabric}>
                  {x.fabric}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Product</h1>
        <Select
          onValueChange={(e) => {
            handleProduct(e, job, setJob);
          }}
        >
          <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {job.productList?.map((x) => {
              return (
                <SelectItem key={x.product} value={x.product}>
                  {x.product}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className=" mb-[10px]">
        <h1 className="text-sm">Quantity</h1>
        <input
          onChange={(e) => {
            handleQuantity(e, job, setJob);
          }}
          className="border-[1px] bg-white rounded-md border-black w-[345px] sm:w-[400px] h-[30px]"
        />
      </div>
      <div className="flex  mb-[10px]">
        <h1 className="text-sm">Rolling Required</h1>
        <input
          type="checkbox"
          onChange={(e) => {
            handleRollingRequired(e, job, setJob);
          }}
          className="  border-[1px] border-black"
        />
      </div>
      <div className="mb-[10px] ">
        <h1 className="text-sm ">Transaction</h1>
        <Select
          onValueChange={(e) => {
            handleTransaction(e, job, setJob);
          }}
        >
          <SelectTrigger className="bg-white w-[345px] sm:w-[400px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"Regular"}>Regular</SelectItem>
            <SelectItem value={"Exception"}>Exception</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" mb-[10px]">
        <div className="flex">
          <h1 className="text-sm mr-[30px]">GST PAID</h1>
          <input
            type="checkbox"
            onChange={() => {
              handleGst(job, setJob);
            }}
            className="bg-white"
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">GST Rate in %</h1>
          <Input
            onChange={(e) => {
              handleGstRate(e, job, setJob);
            }}
            className="w-[345px] sm:w-[400px] bg-white sm:w-[345px] sm:w-[400px] h-[30px]"
            disabled={!job.gstPaid}
            placeholder="Value"
            id="gst"
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">Cargo Provider</h1>
          <Select
            onValueChange={(e) => {
              handleCargoProvider(e, job, setJob);
            }}
          >
            <SelectTrigger className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px]">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {cargoProviders?.map((i) => {
                return (
                  <SelectItem key={i.supplier} value={i.supplier}>
                    {i.supplier}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" mb-[10px]">
        <div className="flex">
          <h1 className="text-sm mr-[30px]">Cargo Paid By Supplier</h1>
          <input
            type="checkbox"
            id="cp"
            className="bg-white"
            onChange={(e) => {
              handleCargoPaidBySupplier(job, setJob);
            }}
          />
        </div>
      </div>
      <div className=" mb-[10px] w-[345px] sm:w-[400px] flex justify-center">
        <div className="">
          <h1 className="mr-[16px] text-sm">Cargo Charges</h1>
          <Input
            className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px]"
            placeholder={0}
            onChange={(e) => {
              handleCargoCharges(e, job, setJob);
            }}
            id="cc"
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">Additional Charges</h1>
          <Input
            className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px]"
            placeholder="0"
            onChange={(e) => {
              handleAdditionalCharges(e, job, setJob);
            }}
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">Cost per unit BT</h1>
          <Input
            onChange={(e) => {
              handleCPUBT(e, job, setJob);
            }}
            className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px]"
            placeholder="0"
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">Cost per unit AT</h1>
          <Input
            onValueChange={(e) => {
              handleCPUAT(e, job, setJob);
            }}
            className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px]"
            placeholder={job.cpuAt}
            readOnly
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">Amount Payable To Supplier</h1>
          <Input
            className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px]"
            placeholder={job.amountPaybleToSupplier}
            readOnly
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">Gross Cost</h1>
          <Input
            className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px]"
            placeholder={job.net}
            readOnly
          />
        </div>
      </div>
      <div className=" mb-[10px] flex justify-center">
        <div>
          <h1 className="text-sm">Total Cost</h1>
          <Input
            readOnly
            className="bg-white w-[345px] sm:w-[400px] sm:w-[345px] sm:w-[400px] h-[30px] border-[1px] border-black"
            placeholder={job.totalCost}
          />
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          className="border-[0.5px] m-8 border-neutral-400 border-[#4A84F3]"
        >
          CLEAR
        </Button>
        <Button
          onClick={() => {
            handleSubmit(job, setJob);
          }}
          id="submitButton"
          disabled={btn}
          className="border-[0.5px] m-8 border-neutral-400 border-[#4A84F3]"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
