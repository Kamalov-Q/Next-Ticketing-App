import Ticket from "@/app/ticket-page/(models)/Ticket";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (_: NextRequest, params: { params: any }) => {
  try {
    const id = params;
    console.log("ID", id.params.id);

    const deletedTicket = await Ticket.findByIdAndDelete({ _id: id.params.id });
    if (!deletedTicket) {
      return NextResponse.json(
        { message: "Ticket not found", data: null, success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Ticket deleted successfully",
        data: deletedTicket,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
