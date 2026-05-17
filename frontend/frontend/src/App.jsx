import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/privacy"
        element={<Privacy />}
      />

      <Route
        path="/terms"
        element={<Terms />}
      />

      <Route
        path="/refund"
        element={<Refund />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/success"
        element={<Success />}
      />

      <Route
        path="/cancel"
        element={<Cancel />}
      />

    </Routes>
  );
}

export default App;

