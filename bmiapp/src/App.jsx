import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    height: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, weight, height } = formData;
    const w = parseFloat(weight);
    const h = parseFloat(height); // in cm

    if (!name || !w || !h) {
      setResult("Please fill all fields correctly.");
      return;
    }

    const heightInMeters = h / 100; // 🔁 Convert cm to meters
    const bmi = (w / (heightInMeters * heightInMeters)).toFixed(2);

    let category = "";
    if (bmi < 18.5) {
      category = "underweight";
    } else if (bmi < 24.9) {
      category = "normal weight";
    } else if (bmi < 29.9) {
      category = "overweight";
    } else {
      category = "obesity";
    }

    setResult(`${name}, You are ${category} (BMI: ${bmi})`);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      weight: "",
      height: "",
    });
    setResult("");
  };

  return (
    <div className="container">
      <div className="left">
        <h1 className="title">BMI Calculator</h1>
        <form className="bmi-form" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            id="weight"
            type="number"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
          />
          <input
            id="height"
            type="number"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
          />
          <button className="bmi-button" type="submit">
            Calculate BMI
          </button>
          <button
            className="bmi-button red"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
          <p id="result">{result}</p>
        </form>
      </div>

      <div className="right">
        <img
          src="/hospital.png"
          alt="Druva Hospital Building"
          className="building-img"
        />
      </div>
    </div>
  );
};

export default App;
