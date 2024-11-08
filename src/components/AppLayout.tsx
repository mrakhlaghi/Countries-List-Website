import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="  flex   bg-[#FAFAFA] dark:bg-[#202D36]  h-full  ">
      {/* <Sidebar /> */}
      <div className="w-full h-full  relative  ">
        <Header />
        <div className=" w-full h-full flex flex-col gap-y-12    ">
          {/* <div className="mx-auto max-w-screen-lg flex flex-col gap-y-12"> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default AppLayout;
