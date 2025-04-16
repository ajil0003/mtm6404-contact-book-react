
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </Router>
  );
}

export default App;
