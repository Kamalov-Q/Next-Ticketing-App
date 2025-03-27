import { NextRequest, NextResponse } from "next/server";
import Ticket from "../../(models)/Ticket";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, priority, progress, status } = body;

    if (
      !title ||
      !description ||
      !category ||
      !priority ||
      !progress ||
      !status
    ) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const newTicket = new Ticket({
      title,
      description,
      category,
      priority,
      progress,
      status,
    });

    await newTicket.save();

    return NextResponse.json(
      {
        message: "Ticket created successfully!",
        data: { ticket: newTicket },
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error !", success: false, data: null },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tickets = await Ticket.find();
    return NextResponse.json(
      {
        tickets,
        message: "All Tickets",
        count: tickets?.length,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
        success: false,
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return NextResponse.json(
        { message: "Ticket not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Ticket deleted successfully",
        success: true,
        data: deletedTicket,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false, data: null },
      { status: 500 }
    );
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const searchParams = req.nextUrl.searchParams;
//     const id = searchParams;

//     const foundTicket = await Ticket.findOne({ _id: id });

//     if (!foundTicket) {
//       return NextResponse.json(
//         { message: "Ticket not found", success: false },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ foundTicket });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json(
//       {
//         message: "Internal Server Error",
//         data: null,
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }


