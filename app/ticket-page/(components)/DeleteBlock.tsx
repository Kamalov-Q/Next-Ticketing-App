"use client";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }: { id: string | undefined }) => {
  const router = useRouter();

  const deleteTicket = async () => {
    try {
      const response = await fetch(`/ticket-page/api/tickets?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
        router.push(`/`);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
