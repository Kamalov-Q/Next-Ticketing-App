"use client";
import { Category, Status, Ticket } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
const TicketForm = () => {
  const initialTicketData = {
    title: "",
    description: "",
    category: "Hardware Problem" as Category,
    status: "started" as Status,
    priority: 1,
    progress: 0,
    active: true,
  };

  const [formData, setFormData] = useState<Ticket>(initialTicketData);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    try {
      const { name, value, type } = event?.target;
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          [name]:
            type === "radio" || type === "number" ? parseInt(value) : value,
        };

        console.log("Updated formData:", updatedData); // Logs the correct state

        return updatedData;
      });
    } catch (error) {
      console.error("Error in form handling:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const response = await fetch(`api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response?.ok) {
      throw new Error(`Error creating ticket: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Data from request", data);
    setFormData({
      title: "",
      description: "",
      category: "Hardware Problem" as Category,
      status: "started" as Status,
      priority: 1,
      progress: 0,
      active: true,
    })
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Create Your Ticket</h3>
        <label htmlFor="title">Title :</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
          placeholder="Enter your title : "
          value={formData?.title}
        />
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          rows={5}
          placeholder="Enter your description : "
          value={formData?.description}
        />
        <label htmlFor="category">Category : </label>
        <select
          name="category"
          id="category"
          value={formData?.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Network Problem">Network Problem</option>
          <option value="Other">Other</option>
        </select>
        <div>
          <label>Priority : </label>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            value={1}
            checked={formData?.priority === 1}
            onChange={handleChange}
          />
          <label htmlFor="priority-1">1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            value={2}
            checked={formData?.priority === 2}
            onChange={handleChange}
          />
          <label htmlFor="priority-2">2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            value={3}
            checked={formData?.priority === 3}
            onChange={handleChange}
          />
          <label htmlFor="priority-3">3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            value={4}
            checked={formData?.priority === 4}
            onChange={handleChange}
          />
          <label htmlFor="priority-4">4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            value={5}
            checked={formData?.priority === 5}
            onChange={handleChange}
          />
          <label htmlFor="priority-5">5</label>
        </div>
        <label htmlFor="progress">Progress : </label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData?.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />
        <label htmlFor="status">Status : </label>
        <select
          name="status"
          id="status"
          required
          value={formData?.status}
          onChange={handleChange}
        >
          <option value="started">Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input type="submit" className="btn" value={`Create Ticket`} />
      </form>
    </div>
  );
};

export default TicketForm;
