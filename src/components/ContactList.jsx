import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../Utils/db.js";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsRef = collection(db, "contacts");
      const q = query(contactsRef, orderBy("lastName"));
      const snapshot = await getDocs(q);
      const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const filtered = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Contact List</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add New Contact</Link>
    </div>
  );
}

export default ContactList;
