import Home from "./pages/home.jsx";
import Register from "./pages/register.jsx";
import Accomodation from "./pages/accomodation.jsx";
import Contact from "./pages/contact.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accomodation" element={<Accomodation />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
