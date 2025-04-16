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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Edit Contact</h2>

        <label style={styles.label}>First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.buttons}>
          <button type="submit" style={styles.submitBtn}>Update</button>
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
  submitBtn: {
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

export default EditContact;
