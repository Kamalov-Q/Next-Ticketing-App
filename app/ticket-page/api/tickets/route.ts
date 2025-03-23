import { NextResponse } from "next/server";
import Ticket from "../../(models)/Ticket";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, priority } = body;

    if (!title || !description || !category || !priority) {
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
