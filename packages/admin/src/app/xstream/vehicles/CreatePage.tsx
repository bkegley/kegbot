import React from "react";

export const CreateVehiclePage = () => {
  const [name, setName] = React.useState("");
  const [cost, setCost] = React.useState(0);

  const handleSubmit = () => {
    fetch("http://localhost:4040/xstream/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cost })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div>
      <h1>Create a vehicle</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="cost">Cost</label>
        <input
          type="number"
          value={cost}
          onChange={e => setCost(parseInt(e.currentTarget.value))}
        />
      </div>
      <div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
