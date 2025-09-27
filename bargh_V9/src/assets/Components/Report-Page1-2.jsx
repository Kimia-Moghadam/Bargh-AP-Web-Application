import React, { useEffect, useState } from "react";

function ReportPageOnetwo() {
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    const savedData = localStorage.getItem("inputInfo");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const companyName = formData.Input_Bill_Image || "شرکت برقآپ"; 

  const monthNames = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];


  const analysisPeriod = formData.Input_Analysis_Period 
    ? monthNames[formData.Input_Analysis_Period - 1] 
    : "فروردین 1402"; 

  return (
    <div className="bg-white text-right font-BNazanin flex items-center ">
      <div className="w-full bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full  px-4  py-10" dir="rtl">
         

          <img
            src="/img/logo-barghman2.png" 
            alt="Logo"
            className="h-13 w-auto sm:pr-4 pt-10"
          />
           <span className="text-lg sm:text-lg md:text-2xl pl-4 sm:pt-10 font-semibold text-[#2D3191] ml-0 md:ml-8 text-center md:text-right"
        style={{ fontFamily: 'yekanbakh-bold' }}>
            گزارش تحلیل صورت حساب دوره {analysisPeriod} شرکت {companyName}
          </span>
          
        </div>
        <div className="flex flex-col sm:flex-row  justify-center  sm:p-5 ">

          <div className="relative w-full sm:w-1/2 ml-0 sm: mt-6 px-8 py-8 border-2 border-[#2D3191] rounded-xl flex justify-center items-center">
            <div className="absolute right-5 top-0 transform -translate-y-1/2 px-6 py-2 bg-[#2D3191] rounded-full text-white text-center" style={{ fontFamily: 'yekanbakh-bold' }}>
              سهم بازار برقآپ
            </div>
            <div className="bg-white text-right p-4 space-y-4 font-sans leading-loose flex justify-center items-center">
              <img src="/img/12.jpg" alt="Support Icon" className="max-w-full h-auto object-contain" />
            </div>
          </div>


          <div className="relative w-full sm:w-1/2 ml-0 sm:ml-4 mt-6 px-20 py-8 border-2 border-[#2D3191] rounded-xl flex justify-center items-center">
            <div className="absolute right-5 top-0 transform -translate-y-1/2 px-6 py-2 bg-[#2D3191] rounded-full text-white text-center z-20" style={{ fontFamily: 'yekanbakh-bold' }}>
              صنایع طرف قرارداد برقآپ
            </div>
            <div className="bg-white text-right p-4 space-y-4 font-sans leading-loose flex justify-center items-center">
              <img src="/img/mapIran.png" alt="Support Icon" className="max-w-full h-auto object-contain" />
            </div>
          </div>
        </div>
  </div>
</div>
)}
export default ReportPageOnetwo;