"use client";
import { useEffect, useState } from "react";
import TicketCard from "./ticket-page/(components)/TicketCard";
import { Ticket } from "@/lib/types";

// const getTickets = async (): Promise<{ tickets: Ticket[] }> => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/tickets`, {
//       cache: "no-store",
//     });

//     return res.json();
//   } catch (error) {
//     console.error("Error fetching data : ", error);
//     return { tickets: [] };
//   }
// };

const Home = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await fetch(`/ticket-page/api/tickets`, {
          cache: "no-store",
        });
        const data = await res.json();
        setTickets(data.tickets);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data : ", error);
        setTickets([]);
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 place-items-center justify-center items-center">
                {tickets
                  ?.filter((ticket) => ticket?.category === uniqueCategory)
                  ?.map((filteredTicket, _index) => (
                    <TicketCard
                      id={String(_index)}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
