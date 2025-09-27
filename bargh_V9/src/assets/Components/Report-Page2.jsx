import React, { useEffect, useState } from 'react';
import EnergyChart from './cylinderBar';

const ReportPagetwo = () => {
  const [formData, setFormData] = useState({});
  const [companyName, setCompanyName] = useState("");
  const [electricityData, setElectricityData] = useState({});


  useEffect(() => {
    const savedData = localStorage.getItem("inputInfo");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setCompanyName(parsedData.Input_Bill_Image || "شرکت برق آپ");
    }
		const savedBaseInfo = JSON.parse(localStorage.getItem("baseInfo"));
		const saveInputInfo = JSON.parse(localStorage.getItem("inputInfo"));

		const mergedData = {
			...savedBaseInfo,
			...saveInputInfo,
			Input_Green_OurPrice: 0,
			Input_Green_Load_Purchase: 0,
		};

		fetch("http://localhost:8000/calculate/", {
			body: JSON.stringify(mergedData),
			method: "POST",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (!response.ok) {
					console.error("خطا در ارسال داده‌ها به سرور");
				}
				return response.json();
			})
			.then((data) => {
				//console.log("داده‌های دریافتی از سرور:", data);
				const newOutputInfo = {
					Price_WO_Contract_1: data?.Price_WO_Contract?.[1],
					Price_WO_Contract_3: data?.Price_WO_Contract?.[3],
					Price_WO_Contract_Total:
						Number(data?.Price_WO_Contract?.[1]) +
						Number(data?.Price_WO_Contract?.[3]),
					Price_WO_Contract_4: data?.Price_WO_Contract?.[4],
					Price_WO_Contract_5:
						Number(data?.Price_WO_Contract?.[5]) +
						Number(data?.Price_WO_Contract?.[5]),

					Price_Seperate_Contract_1: data?.Price_Base_V6?.[1],
					Price_Seperate_Contract_3: data?.Price_Base_V6?.[3],
					Price_Seperate_Contract_Total:
						Number(data?.Price_Base_V6?.[1]) + Number(data?.Price_Base_V6?.[3]),
					Price_Seperate_Contract_4: data?.Price_Base_V6?.[4],
					Price_Seperate_Contract_5: data?.Price_Base_V6?.[5],
					Price_Diff_5: data?.Price_Base_V6?.[6],

					Price_Base_V6_1: data?.Price_Seperate_Contract?.[1],
					Price_Base_V6_3: data?.Price_Seperate_Contract?.[3],
					Price_Base_V6_Total:
						Number(data?.Price_Seperate_Contract?.[1]) +
						Number(data?.Price_Seperate_Contract?.[3]),
					Price_Base_V6_4: data?.Price_Seperate_Contract?.[4],
					Price_Base_V6_5: data?.Price_Seperate_Contract?.[5],
					Price_Base_V6_6:
						Number(data?.Price_WO_Contract?.[5]) -
						Number(data?.Price_Seperate_Contract?.[5]),

					Price_Base_Optimum_1: data?.Price_Base_Optimum?.[1],
					Price_Base_Optimum_3: data?.Price_Base_Optimum?.[3],
					Price_Base_Optimum_Total:
						Number(data?.Price_Base_Optimum?.[1]) +
						Number(data?.Price_Base_Optimum?.[3]),
					Price_Base_Optimum_4: data?.Price_Base_Optimum?.[4],
					Price_Base_Optimum_5: data?.Price_Base_Optimum?.[5],
					Price_Base_Optimum_6: data?.Price_Base_Optimum?.[6],
				};
				//setOutputInfo(newOutputInfo);
        setElectricityData(data); 
				//localStorage.setItem("outputInfo", JSON.stringify(newOutputInfo));
			});
	}, []);



  const monthNames = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];

  const analysisPeriod = formData.Input_Analysis_Period
    ? monthNames[formData.Input_Analysis_Period - 1]
    : "فروردین 1402";


  const priceWOC = electricityData.Price_WO_Contract || [];
  const priceWOC2 = electricityData.Price_Seperate_Contract || [];
  const priceBaseOptimum = electricityData.Price_Base_Optimum || [];


  const savingAmount = priceWOC[5] - priceWOC2[5]; 
  const optimizedPurchaseAmount = priceBaseOptimum[7] || "مقدار وارد نشده";
  const savingAmountBaseOptimum = priceBaseOptimum[6] || "مقدار وارد نشده";

  return (
    
    <>
    <div className="bg-white text-right flex flex-col w-full px-5 sm:p-6 md:p-10 ml-0 gap-5 ">
  <div className="w-full bg-white">
  
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full px-5 py-10" dir="rtl">
      <img
        src="/img/logo-barghman2.png"
        alt="Logo"
        className="h-13 w-auto mb-3 md:mb-0"
      />
      <span
        className="text-lg sm:text-lg md:text-2xl font-semibold text-[#2D3191] ml-0 md:ml-8 text-center md:text-right"
        style={{ fontFamily: 'yekanbakh-bold' }}
      >
        گزارش تحلیل صورت حساب دوره {analysisPeriod} شرکت {companyName}
      </span>
    </div>

  
    <div className="relative mt-5 md:mt-7 px-4 py-5 sm:px-6 md:px-5 border-2 border-[#2D3191] rounded-xl">
      <div className="absolute right-4 top-[-1.5rem] px-4 py-1 sm:px-8 sm:py-2 bg-[#2D3191] rounded-full text-white text-sm sm:text-base md:text-lg" style={{ fontFamily: 'yekanbakh-bold' }}>
        راهکار های کاهش هزینه برق شما
      </div>

         <div className="bg-white text-right p-3 sm:p-6 space-y-6">
                    
                    <div className="flex flex-col sm:flex-row-reverse justify-start items-center text-right space-y-3 sm:space-y-0 sm:space-x-0 sm:space-x-reverse">
                        <img src="/img/13.PNG" alt="Support Icon" className="w-12 h-12 sm:w-16 sm:h-16 sm:mr-4" />
                        <h1 className="text-2xl sm:text-2xl md:text-2xl text-[#2D3191] font-semibold" dir="rtl" style={{ fontFamily: 'yekanbakh-bold' }}>
                          تحلیل صورت‌حساب مشتری محترم: {companyName}
                        </h1>
                    </div>


           
            <div className="flex flex-col sm:flex-row-reverse justify-between items-center text-right space-y-3 sm:space-y-0 sm:space-x-4">
                <p className="text-base sm:text-lg md:text-xl text-[#2D3191]" dir="rtl" style={{ fontFamily: 'yekanbakh-regular' }}>
                  اگر برق نخرید، جریمه می‌شید و بهای انرژی پشتیبان شما 
                   <span> {electricityData.Price_WO_Contract ? priceWOC[5].toLocaleString("en-US") : " ........... "} </span>
                   ریال میشه 
                  !
                </p>
                <img src="/img/14.PNG" alt="Support Icon" className="w-20 h-20 sm:w-28 sm:h-28" />
            </div>

        <hr className="border-b-2 border-black" />

        <div className="flex flex-row-reverse  items-center mb-4">
          <img src="/img/15.PNG" alt="Support Icon" className="w-12 h-12" />
              <h1 className="text-2xl text-[#2D3191] font-semibold text-left" style={{ fontFamily: 'yekanbakh-bold' }}>
                !!!اما خبری خوب! شما می‌توانید با این دو روش هزینه‌هایتان رو کاهش بدید
              </h1>
              
            </div>
        <div className="flex flex-col sm:flex-row mb-4 space-y-3 sm:space-y-0">
          <div className="flex justify-center sm:justify-start w-full sm:w-1/5">
            <img src="/img/16.PNG" alt="Description of image" className="w-20 sm:w-auto" />
          </div>
          <div className="flex flex-col w-full sm:w-4/5 space-y-2">
            <div className="flex items-center flex-row-reverse">
              <div className="w-8 h-8 m-2 sm:w-10 sm:h-10 rounded-full border-2 border-black flex items-center justify-center text-base sm:text-lg font-bold text-black">
                1
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#E1313A] ml-2 sm:ml-8" style={{ fontFamily: 'yekanbakh-bold' }}>
                میخوای برق رو بازه‌ای بخری؟
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-[#2D3191]"  dir="rtl" style={{ fontFamily: 'yekanbakh-regular' }}>
              عالیه! می‌تونید برقتون رو دقیقا مشابه با مصرف کنتور و در انتهای دوره مصرف، بصورت شرایطی خریداری کنید.
            </p>
            <ul className=" pl-4 text-base sm:text-lg text-[#2D3191]">
              <li>میزان صرفه‌جویی: {savingAmount.toLocaleString("en-US")} ریال</li>
            </ul>
          </div>
        </div>

       
        <div className="flex flex-col sm:flex-row mb-4 space-y-3 sm:space-y-0">
          <div className="flex flex-col w-full sm:w-4/5 space-y-2">
            <div className="flex items-center flex-row-reverse">
              <div className="w-8 h-8 sm:w-10 m-2 sm:h-10 rounded-full border-2 border-black flex items-center justify-center text-base sm:text-lg font-bold text-black">
                2
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#E1313A] ml-2 sm:ml-8" style={{ fontFamily: 'yekanbakh-bold' }}>
                میخوای برق رو پایه بخری؟
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-[#2D3191]" dir="rtl" style={{ fontFamily: 'yekanbakh-regular' }}>
              الگوریتم هوش مصنوعی برقآپ، نقطه خرید بار پایه شما را بهینه‌سازی می‌کنه و بهترین پیشنهادات رو بهتون ارائه می‌ده.
            </p>
            <ul className=" pl-4 text-base sm:text-lg text-[#2D3191]">
              <li>میزان خرید بهینه صرفه‌جویی: {optimizedPurchaseAmount.toLocaleString("en-US")} کیلووات/ساعت</li>
              <li>میزان صرفه‌جویی: {savingAmountBaseOptimum.toLocaleString("en-US")} ریال</li>
            </ul>
          </div>
          <div className="flex justify-center sm:justify-end w-full sm:w-1/5">
            <img src="/img/17.PNG" alt="Description of image" className="w-20 sm:w-auto" />
          </div>
        </div>

       
        <div className="w-full overflow-x-auto" style={{ fontFamily: 'yekanbakh-regular' }} >
          <EnergyChart />
        </div>
      </div>
    </div>
  </div>
</div>

    </>

  );
};

export default ReportPagetwo;
