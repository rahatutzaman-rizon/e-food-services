import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar";

export default function InitialLayout() {
  return (
    <div className="flex">
      <div className="lg:w-[22%]">
        <SideBar />
      </div>
      <div className="lg:w-[78%] xs:w-[100%]">
        <Outlet />
      </div>
    </div>
  );
}
