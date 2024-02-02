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

const handleSubmit = (job, setJob) => {
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
  if (!job.printType) {
    alert("Enter Print Type");
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
  fetch("api/jobStock", {
    method: "POST",
    body: JSON.stringify(job),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((x) => {
      if (x == "success") {
        window.location.reload();
        alert("Added to db");
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
  console.log(e);
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
    .select("Product")
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
    quantity: parseFloat(e.target.value),
    ...rest,
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
  });
};
export default function JobWork({
  fabric,
  dyeType,
  printType,
  jobWorkType,
  names,
}) {
  const [job, setJob] = useRecoilState(jobState);
  console.log(job);
  return (
    <div>
      <div className="flex mb-8 ml-[32px] mt-4">
        <img
          width="36"
          height="36"
          src="https://img.icons8.com/ios-filled/50/lawyer.png"
          alt="lawyer"
        />
        <h1 className="text-2xl">JOBWORK FORM</h1>
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm">Job Work Date</h1>
        <input
          onChange={(e) => {
            handleDate(e, job, setJob);
          }}
          type="date"
          className="border-[1px] border-black w-[300px] h-[30px]"
        />
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Job Worker Name</h1>
        <Select
          onValueChange={(e) => {
            handleJobWorkerName(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
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
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Work Type</h1>
        <Select
          onValueChange={(e) => {
            handleWorkType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
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
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Dye Type</h1>
        <Select
          onValueChange={(e) => {
            handleDyeType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
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
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Movement Type</h1>
        <Select
          onValueChange={(e) => {
            handleMovementType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"out"}>Out</SelectItem>
            <SelectItem value={"in"}>In</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Fabric</h1>
        <Select
          onValueChange={(e) => {
            handleFabric(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
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
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Product</h1>
        <Select
          onValueChange={(e) => {
            handleProduct(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {job.productList?.map((x) => {
              return (
                <SelectItem key={x.Product} value={x.Product}>
                  {x.Product}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {/* <div className="ml-4 flex mb-[10px]">
        <h1 className="text-sm">Print Type</h1>
        <Select
          onValueChange={(e) => {
            handlePrintType(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {printType?.map((x) => {
              return (
                <SelectItem key={x.printType} value={x.printType}>
                  {x.printType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div> */}
      <div className="ml-4 mb-[10px]">
        <h1 className="text-sm">Quantity</h1>
        <input
          onChange={(e) => {
            handleQuantity(e, job, setJob);
          }}
          className="border-[1px] rounded-md border-black w-[300px] h-[30px]"
        />
      </div>
      <div className="flex ml-4 mb-[10px]">
        <h1 className="text-sm">Rolling Required</h1>
        <input
          type="checkbox"
          onChange={(e) => {
            handleRollingRequired(e, job, setJob);
          }}
          className="bg-[#FFF4ED] ml-4 border-[1px] border-black"
        />
      </div>
      <div className="mb-[10px] ml-4">
        <h1 className="text-sm ">Transaction</h1>
        <Select
          onValueChange={(e) => {
            handleTransaction(e, job, setJob);
          }}
        >
          <SelectTrigger className="w-[300px] h-[30px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value={"regular"}>regular</SelectItem>
            <SelectItem value={"adjustment"}>adjustment</SelectItem>
          </SelectContent>
        </Select>
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
        <a
          onClick={() => {
            handleSubmit(job, setJob);
          }}
          class="inline-flex cursor-pointer items-center justify-center rounded-md py-2 sm:text-sm font-medium disabled:pointer-events-none disabled:opacity-60 transition-all ease-in-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 relative group bg-gradient-to-b from-blue-500 to-blue-600 hover:opacity-90 text-white active:scale-[99%] duration-200 shadow-sm h-10 w-full px-4 text-sm sm:w-fit"
        >
          Submit
        </a>
      </div>
    </div>
  );
}
