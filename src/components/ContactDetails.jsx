import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../Utils/db.js";

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const contactRef = doc(db, "contacts", id);
      const snapshot = await getDoc(contactRef);
      if (snapshot.exists()) {
        setContact({ id: snapshot.id, ...snapshot.data() });
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.name}>
          {contact.firstName} {contact.lastName}
        </h2>
        <p style={styles.info}><strong>Email:</strong> {contact.email}</p>
        {contact.phone && <p style={styles.info}><strong>Phone:</strong> {contact.phone}</p>}
        {contact.address && <p style={styles.info}><strong>Address:</strong> {contact.address}</p>}

        <div style={styles.actions}>
          <Link to={`/edit/${id}`} style={styles.button}>Edit</Link>
          <button onClick={handleDelete} style={{ ...styles.button, backgroundColor: "#ff4d4d" }}>
            Delete
          </button>
        </div>
        <Link to="/" style={styles.backLink}>← Back to list</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "30px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    textAlign: "center",
  },
  info: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: " #646cff",
    color: "#fff",
    textDecoration: "none",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backLink: {
    display: "block",
    marginTop: "20px",
    textAlign: "center",
    textDecoration: "none",
  },
};

export default ContactDetails;
