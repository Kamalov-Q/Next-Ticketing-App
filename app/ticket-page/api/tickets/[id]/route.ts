import Ticket from "@/app/ticket-page/(models)/Ticket";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
//   context: { params: { id: string } }
{params}
) {
  try {
    const { id } = params;;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ticket deleted successfully", data: deletedTicket },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
