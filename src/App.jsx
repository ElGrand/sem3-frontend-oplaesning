import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import { useEffect } from "react";
import facade from "./ApiFacade";

// routes
import Home from "./routes/guest/Home";
import CreateUser from "./routes/guest/CreateUser";
import Login from "./routes/guest/Login";
import About from "./routes/guest/About";
import AdminDashboard from "./routes/admin/AdminDashboard";
import UserDashboard from "./routes/user/UserDashboard";
import AdminWorkouts from "./routes/admin/AdminWorkouts";
import UserWorkouts from "./routes/user/UserWorkouts";
import AdminExercises from "./routes/admin/AdminExercises";
import Activity from "./routes/user/UserActivity";
import PageNotFound from "./routes/guest/PageNotFound";
import Boats from "./routes/admin/Boats";
import BoatSearch from "./routes/user/BoatSearch";
import AdminHarbour from "./routes/admin/AdminHarbour";

function App() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (facade.loggedIn()) {
      const token = facade.getToken();
      let username = facade.readJwtToken(token).username;
      let role = facade.readJwtToken(token).roles;
      setUsername(username);
      setRole(role);
    }
  }, []);

  const adminRoutes = (
    <Fragment>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/workouts" element={<AdminWorkouts />} />
      <Route path="/exercises" element={<AdminExercises />} />
      <Route path="/boats" element={<Boats />} />
      <Route path="/harbours" element={<AdminHarbour />} />
    </Fragment>
  );

  const userRoutes = (
    <Fragment>
      <Route path="/" element={<UserDashboard username={username} />} />
      <Route path="/boats" element={<Boats username={username} />} />
      <Route path="/specificBoat" element={<BoatSearch username={username} />} />
      <Route path="/workouts" element={<UserWorkouts username={username} />} />
      <Route path="/activity" element={<Activity username={username} />} />
    </Fragment>
  );

  return (
    <Fragment>
      <Layout username={username} role={role}>
        <Routes>
          {role === "admin" ? adminRoutes : null}
          {role === "user" ? userRoutes : null}

          <Route path="/" element={role === "admin" || role === "user" ? null : <Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
