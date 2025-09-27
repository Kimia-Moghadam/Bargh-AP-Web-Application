import React, { useState } from "react";

const SendRequest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sampleData = {
    Input_Month: 1,
    Input_No_Days: 31,
    Input_No_Fridays: 4,
    Input_Low_Load_Hours: 9,
    Input_Mid_Load_Hours: 13,
    Input_High_Load_Hours: 2,
    Input_Low_Load_Electricity_Market_Price_Max: 2460,
    Input_Mid_Load_Electricity_Market_Price_Max: 2506,
    Input_High_Load_Electricity_Market_Price_Max: 2481,
    Input_Low_Load_Stock_Market_Price_Avg: 1276,
    Input_Mid_Load_Stock_Market_Price_Avg: 1282,
    Input_High_Load_Stock_Market_Price_Avg: 1284,
    Input_Low_Load_Energy: 2696740,
    Input_Mid_Load_Energy: 5405478,
    Input_High_Load_Energy_Normal: 1117532,
    Input_High_Load_Energy_Friday: 0,
    Input_Low_Load_OurPrice: 1650,
    Input_Mid_Load_OurPrice: 1650,
    Input_High_Load_OurPrice: 1650,
    Input_Base_Load_OurPrice: 1650,
    Input_Costumer_Choice_Pre: 13000,
    Input_Costumer_Choice_Pre_Price: 1800,
    Input_Green_OurPrice: 0,
    Input_Green_Load_Purchase: 0,
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/calculate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleData),
      });

      if (!response.ok) {
        throw new Error("Request failed: " + response.statusText);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Electricity Price Calculator</h2>
      <button
        className="text-[30px] bg-[#2D3191] text-white py-2 px-10 rounded-[15px] hover:brightness-110 transition-all shadow-md w-[100%]"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Calculating..." : "Send Request"}
      </button>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {result && (
        <pre
          style={{ textAlign: "left", background: "#f4f4f4", padding: "1rem" }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default SendRequest;
