import { Ticket } from "@/lib/types";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";

interface TicketCardProps {
  ticket: Ticket;
  id: string;
}

const TicketCard = ({ id, ticket }: TicketCardProps) => {
  console.log(id, ticket);

  const formatTimeStamp = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date?.toLocaleString("en-US", options);

    return formattedDate;
  };

  return (
    <div className="flex flex-col min-w-[350px] min-h-[250px] bg-[#47566a] hover:bg-[#4f5e74] rounded-md shadow-lg p-3 m-5">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket?.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket?._id} />
        </div>
      </div>
      <Link href={`/ticket-page/${ticket?._id}`} style={{display : "contents"}}>
        <h4>{ticket?.title}</h4>
        <hr className="h-px border-0 bg-[#2b3441] mb-2" />
        <p className="whitespace-pre-wrap">{ticket?.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">
              {ticket?.createdAt ? formatTimeStamp(ticket.createdAt) : "N/A"}
            </p>
            <ProgressDisplay progress={ticket?.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={ticket?.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
