import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "../Utils/db.js";

function AddContact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "contacts"), form);
    navigate(`/contact/${docRef.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Contact</h2>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <button type="submit">Add</button>
      <br />
      <button type="button" onClick={() => navigate("/")}>Cancel</button>
    </form>
  );
}

export default AddContact;
