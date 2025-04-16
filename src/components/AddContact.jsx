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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add New Contact</h2>

        <label style={styles.label}>First Name</label>
        <input
          name="firstName"
          placeholder="John"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Last Name</label>
        <input
          name="lastName"
          placeholder="Doe"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.buttons}>
          <button type="submit" style={styles.addBtn}>Add</button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#646cff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AddContact;
