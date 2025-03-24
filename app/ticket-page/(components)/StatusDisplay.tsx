import { Status } from "@/lib/types";

interface StatusDisplayProps {
  status: Status;
}

const StatusDisplay = ({ status }: StatusDisplayProps) => {
  console.log(status, "Status display");

  const getColor = (status: Status) => {
    let color = "bg-slate-700";
    switch (status.toLowerCase()) {
      case "started": {
        color = "bg-red-200";
        return color;
      }
      case "in-progress": {
        color = "bg-yellow-200";
        return color;
      }
      case "completed": {
        color = "bg-green-200";
        return color;
      }
    }
    return color;
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )}`}
    >
      {status?.toUpperCase()}
    </span>
  );
};

export default StatusDisplay;
