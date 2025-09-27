import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { EntryTimeContext } from "../../App";

const Header = () => {
const navigate=useNavigate()
const time=useContext(EntryTimeContext)
// console.log(time)
  const handleLogout =()=>{
    debugger
    navigate("/")
  }
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center border-b px-6 py-6 bg-gray-100 shadow w-full lg:ml-[150px]">
      

      <div className="mb-4 lg:mb-0">
        <img
          src="/img/logo-barghman.png"
          alt="برق من"
          className="h-[120px] w-auto mx-auto lg:mx-0"
        />
      </div>


      <div className="flex flex-col lg:flex-row items-center gap-6 flex-1 justify-center text-center lg:text-right">
        <div className="text-center lg:text-right max-w-[90%] lg:max-w-[70%]">
          <h1 className="text-3xl font-bold leading-snug text-center lg:mr-40">
           <span className="block"> قبوض مشترکین صنعت</span> سامانه تحت‌ شبکه تحلیل نقطه بهینه
          </h1>
        </div>
        <div style={{ fontFamily: 'yekanbakh-regular' }} className="flex flex-col text-2xl leading-7 font-light lg:mr-20">
          <span>تاریخ ورود: {time.entryTime.date}</span>
          <span>ساعت ورود: {time.entryTime.time}</span>
        </div>
      </div>


      <div className="flex items-center gap-3 mt-4 lg:mt-0" onClick={handleLogout }>
        <img
          src="/img/exit-icon.PNG"
          alt="خروج"
          className="h-14 w-14 cursor-pointer"
        />
        <button className="text-[#2D3191] text-xl font-bold" >خروج</button>
      </div>
    </div>
  );
};

export default Header;
