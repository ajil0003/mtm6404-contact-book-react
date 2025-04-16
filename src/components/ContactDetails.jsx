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
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Email: {contact.email}</p>
      <Link to={`/edit/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
      <br />
      <Link to="/">Back to list</Link>
    </div>
  );
}

export default ContactDetails;
