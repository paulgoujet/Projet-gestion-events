import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArtistsTicker from "./components/ArtistsTicker";
import EventsList from "./pages/EventsList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import AdminEvents from "./pages/AdminEvents";
import AdminEventEdit from "./pages/AdminEventEdit";
import AdminCreateEvent from "./pages/AdminCreateEvent";

function App() {
  return (
    <>
      <Navbar />
      <ArtistsTicker />


      <div className="p-4">
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/events/:id/edit" element={<AdminEventEdit />} />
          <Route path="/admin/events/create" element={<AdminCreateEvent />} />





        </Routes>
      </div>
    </>
  );
}

export default App;