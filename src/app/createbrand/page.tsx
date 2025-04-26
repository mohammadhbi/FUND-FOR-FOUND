"use client";
import { useState } from "react";

export default function BrandForm() {
  const [form, setForm] = useState({
    Brandname: "",
    Country: "",
    Category: "",
    Subcategory: "",
    Brandtag: [],
    Privacy: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "Brandtag") {
      const newTags = checked
        ? [...form.Brandtag, value]
        : form.Brandtag.filter((tag) => tag !== value);
      setForm({ ...form, Brandtag: newTags });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("https://my-strapi-project-lm3x.onrender.com/api/brand-forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: form }),
    });

    const result = await res.json();
    console.log(result);
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4 bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-xl font-bold">Brand Form</h2>

      <input
        type="text"
        name="Brandname"
        placeholder="Brand name"
        value={form.Brandname}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

<div>
  <label className="block mb-1 font-medium">Country</label>
  <select
    name="Country"
    value={form.Country}
    onChange={handleChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="">Choose Country</option>
    {["USA", "UK", "Germany"].map((country) => (
      <option key={country} value={country}>
        {country}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="block mb-1 font-medium">Category</label>
  <select
    name="Category"
    value={form.Category}
    onChange={handleChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="">Choose Category</option>
    {["Clothing", "Electronics", "Food"].map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="block mb-1 font-medium">Subcategory</label>
  <select
    name="Subcategory"
    value={form.Subcategory}
    onChange={handleChange}
    required
    className="w-full border p-2 rounded"
  >
    <option value="">Choose Subcategory</option>
    {["Shoes", "Phones", "Snacks"].map((sub) => (
      <option key={sub} value={sub}>
        {sub}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="block mb-1 font-medium">Brand Tags</label>
  <select
    name="Brandtag"
    multiple
    value={form.Brandtag}
    onChange={handleChange}
    className="w-full border p-2 rounded"
  >
    {["Premium", "Eco", "Budget"].map((tag) => (
      <option key={tag} value={tag}>
        {tag}
      </option>
    ))}
  </select>
</div>

      <div className="flex items-center gap-2">
        <label htmlFor="Privacy">Is this brand private?</label>
        <input
          type="checkbox"
          name="Privacy"
          checked={form.Privacy}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}