import { Outlet } from "react-router-dom";
import Header from "../widgets/header/Header";
import Footer from "../widgets/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
