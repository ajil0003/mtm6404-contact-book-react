import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../Utils/db.js";

function EditContact() {
  const { id } = useParams();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setForm(snapshot.data());
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "contacts", id);
    await updateDoc(docRef, form);
    navigate(`/contact/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>
      <input name="firstName" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" value={form.lastName} onChange={handleChange} required />
      <input name="email" value={form.email} onChange={handleChange} required />
      <button type="submit">Update</button>
      <br />
      <button type="button" onClick={() => navigate("/")}>Cancel</button>
    </form>
  );
}

export default EditContact;
