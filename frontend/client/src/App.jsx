import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import EventsList from "./pages/EventsList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <>
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-events" element={<MyEvents />} />


        </Routes>
      </div>
    </>
  );
}

export default App;