import { useEffect, useState } from 'react';

function ReportPageTwotwo() {
  const [reactiveEnergyPrice, setReactiveEnergyPrice] = useState(null);
  const [contractPower, setContractPower] = useState(null);
  const [usePower, setUsePower] = useState(null);
  const [useImage, setImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [companyName, setCompanyName] = useState("شرکت برق آپ");  
  const [analysisPeriod, setAnalysisPeriod] = useState("فروردین 1402");  

  useEffect(() => {
    const savedData = localStorage.getItem("inputInfo");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);


      setReactiveEnergyPrice(parsedData.Input_Reactive_Energy_Price || "مقدار وارد نشده");
      setContractPower(parsedData.Input_Contract_Power || "مقدار وارد نشده");
      setUsePower(parsedData.Input_Use_Power || "مقدار وارد نشده");


      setCompanyName(parsedData.Input_Bill_Image || "شرکت برق آپ");
      

      const monthNames = [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
      ];
      
      const period = parsedData.Input_Analysis_Period
        ? monthNames[parsedData.Input_Analysis_Period - 1]
        : "فروردین 1402";  
      setAnalysisPeriod(period);

      const savedImage = parsedData.Input_Upload_Bill || "مقدار وارد نشده";
      if (savedImage !== "مقدار وارد نشده") {
        setImage(savedImage); 
      }
    }
  }, []); 


  const powerDifference = usePower && contractPower ?Number(contractPower) - Number(usePower)  : 0;

  const isZero = (value) => value === "مقدار وارد نشده" || value === "0" || value === 0;


  // const isPowerIdeal = powerDifference === 0;

  return (
    <>

<div className="bg-white text-right flex flex-col w-full justify-between p-5 sm:p-10 gap-5">
  <div className="w-full bg-white">
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full px-5 py-8" dir="rtl">
      <img
        src="/img/logo-barghman2.png"
        alt="Logo"
        className="h-13 w-auto mb-3 md:mb-0"
      />
{/*  */}
      <span
        className="text-lg sm:text-lg md:text-2xl font-semibold text-[#2D3191] ml-0 md:ml-8 text-center md:text-right"
        style={{ fontFamily: 'yekanbakh-bold' }}
      >
        گزارش تحلیل صورت حساب دوره {analysisPeriod} شرکت {companyName}
      </span>
    </div>

    <div className="relative ml-0 sm: mt-5 sm:mt-7 px-4 sm:px-8 py-5 border-2 border-[#2D3191] rounded-xl">
      <div className="absolute right-5 top-[-1.5rem] px-6 py-2 sm:px-10 sm:py-2 bg-[#2D3191] rounded-full text-white text-sm sm:text-base md:text-lg" style={{ fontFamily: 'yekanbakh-bold' }}>
        مشاوره ایتم های صورت حساب برق
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch gap-5 p-3 sm:p-5">
       
        <div className="flex flex-col w-full  justify-between md:w-1/2">
          <h1
            className="text-center text-base sm:text-lg md:text-xl text-[#2D3191] mb-3 sm:mb-4"
            style={{ fontFamily: "yekanbakh-regular" }}
            dir="rtl"
          >
            صفر نمودن ضریب زبان نیازمند نصب بانک خازنی و اصلاح ضریب توان به بالای 91 درصد است.
          </h1>
          <p
            className={`mt-3 sm:mt-6 text-center sm:text-right text-base sm:text-lg md:text-xl font-bold p-2 sm:p-3 rounded-md border-2 ${
              isZero(reactiveEnergyPrice)
                ? 'text-green-500 border-green-500'
                : 'text-red-500 border-red-500'
            }`}
            style={{ fontFamily: "yekanbakh-bold" }}
            dir="rtl"
          >
            <strong>بهای انرژی ریاکتیو:</strong>{" "}
            {isZero(reactiveEnergyPrice)
              ? "😊ایده‌آل!"
              : `😞مقدار بیش از حد است. لطفا بررسی کنید.`}
          </p>
        </div>

        
        <div className="flex flex-col w-full  justify-between  md:w-1/2">
          <h1
            className="text-center text-base sm:text-lg md:text-xl text-[#2D3191] mb-3 sm:mb-4"
            style={{ fontFamily: "yekanbakh-regular" }}
            dir="rtl"
          >
            جهت رفع تجاوز از قدرت، بایستی نسبت به افزایش قدرت قراردادی خود با شرکت برق محل اتصال به شبکه برق اقدام نمایید.
          </h1>
          <p
            className={`mt-3 sm:mt-6 text-center sm:text-right text-base sm:text-lg md:text-xl font-bold p-2 sm:p-3 rounded-md border-2 ${
              powerDifference >= 0
                ? 'text-green-500 border-green-500'
                : 'text-red-500 border-red-500'
            }`}
            style={{ fontFamily: "yekanbakh-bold" }}
            dir="rtl"
          >
            <strong >تجاوز قدرت:</strong>{" "}
            {powerDifference >= 0
              ? " 😊ایده‌آل! تجاوز قدرت وجود ندارد ."
              : `😞تجاوز قدرت وجود دارد! `}
          </p>
        </div>
      </div>
    </div>
  </div>


  <div className="mt-6 sm:mt-10">
    {useImage  ? (
      <img
        src={useImage}
        alt="تصویر قبض"
        className="w-full max-w-4xl mx-auto rounded-md shadow-md"
      />
    ) : (
      <p className="text-center text-base sm:text-lg md:text-xl text-red-500">
        هیچ عکسی موجود نیست 
      </p>
    )}
  </div>
</div>

 
    </>
  );
}

export default ReportPageTwotwo;
