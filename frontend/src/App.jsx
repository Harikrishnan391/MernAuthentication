import React from "react";
import Header from "./components/Header.jsx";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import AdminHeader from "./components/AdminHeader.jsx";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
    
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
