import React, { useEffect, useState } from "react";

function ReportPageOne() {
  const [formData, setFormData] = useState({});
  
  useEffect(() => {

    const savedData = localStorage.getItem("inputInfo");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const companyName = formData.Input_Bill_Image || "شرکت برق آپ"; 


  const monthNames = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];


  const analysisPeriod = formData.Input_Analysis_Period 
    ? monthNames[formData.Input_Analysis_Period - 1] 
    : "فروردین 1402"; 

  return (
    <div className="bg-white text-right  flex items-center sm:px-5 text-lg">
      <div className="w-full bg-white">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full px-4 py-10" dir="rtl">

          <img
            src="/img/logo-barghman2.png" 
            alt="Logo"
            className="h-13 w-auto "
          />

          <span className="text-lg sm:text-lg md:text-2xl font-semibold text-[#2D3191] ml-0 md:ml-8 text-center md:text-right"
        style={{ fontFamily: 'yekanbakh-bold' }}>
            گزارش تحلیل صورت حساب دوره {analysisPeriod} شرکت {companyName}
          </span>
        </div>


        <div className="relative  mt-7 pb-8  px-8 py-3 border-2 border-[#2D3191] rounded-xl flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="absolute right-5 top-0 transform -translate-y-1/2 px-6 py-1 sm:px-16 sm:py-2 bg-[#2D3191] rounded-full text-white text-center" style={{ fontFamily: 'yekanbakh-bold' }}>
             معرفی برقآپ
          </div>



          <div className="flex flex-col items-center ml-4">
            <img
              src="/img/3.PNG"
              alt="Logo 1"
              className="h-16 w-auto mb-2"
            />
            <span className="text-[#2D3191] text-center">
              <span style={{color: '#E1313A', display: 'block',fontFamily: 'yekanbakh-bold'}} dir="rtl">هدف سامانه: </span>
              <span style={{ fontFamily: 'yekanbakh-regular' }}> تسهیل در خرید برق مشترکین بالای یک مگاوات</span>
            </span>
          </div>
        

          <div className="flex flex-col items-center ml-4 ">
            <img
              src="/img/2.PNG"
              alt="Logo 1"
              className="h-16 w-auto mb-2"
            />
            <span className="text-[#2D3191] text-center">
              <span style={{color: '#E1313A', display: 'block',fontFamily: 'yekanbakh-bold'}} dir="rtl">مشتركين هدف سامانه:</span>
              <span style={{ fontFamily: 'yekanbakh-regular' }}>مشترکین برق شرکت های   توزيع و برق منطقه اى با قدرت قراردادى بالاى يک مگاوات</span>
            </span>
          </div>

        

          <div className="flex flex-col items-center ml-4">
            <img
              src="/img/1.PNG"
              alt="Logo 1"
              className="h-13 w-auto mb-2 pt-4"
            />
            <span className="text-[#2D3191] text-center">
              <span style={{color: '#E1313A', display: 'block', fontFamily: 'yekanbakh-bold' }} dir="rtl">تعريف:</span>
              <span style={{ fontFamily: 'yekanbakh-regular' }} dir="rtl">اولين سامانه جامع خريد برق در ايران كه در آبان 1402 متولد گرديد.</span>
            </span>
          </div>
 
  </div> 
  <div className="relative  mt-8 pt-5 px-8  py-3 border-2 border-[#2D3191] rounded-xl flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
  <div className="absolute right-5 top-0 transform -translate-y-1/2 px-6 py-1 sm:px-16 sm:py-2 bg-[#2D3191] rounded-full text-white text-center" style={{ fontFamily: 'yekanbakh-bold' }}>
    قابلیت‌های کلیدی برقآپ
  </div>

  <div className="flex flex-col items-center">
    <img
      src="/img/9.PNG"
      alt="Logo 1"
      className="h-16 w-auto mb-2"
    />
    <span className="text-[#2D3191] text-center">
      <span  style={{ fontFamily: 'yekanbakh-regular' }} >امكان خريد برق سبز با توجه به مصرف در دوره</span>
    </span>
  </div>

  <div className="flex flex-col items-center">
    <img
      src="/img/8.PNG"
      alt="Logo 1"
      className="h-16 w-auto mb-2"
    />
    <span className="text-[#2D3191] text-center">
      <span style={{ fontFamily: 'yekanbakh-regular' }}>امكان خريد برق به بهينه ترين حالت ممکن  در پايان دوره مصرف</span>
    </span>
  </div>

  <div className="flex flex-col items-center">
    <img
      src="/img/7.PNG"
      alt="Logo 1"
      className="h-16 w-auto mb-2"
    />
    <span className="text-[#2D3191] text-center">
      <span style={{ fontFamily: 'yekanbakh-regular' }}>دارنده ظرفيت  تأمين برق به ميزان 6000  مگاوات در ساعت</span>
    </span>
  </div>

  <div className="flex flex-col items-center">
    <img
      src="/img/6.PNG"
      alt="Logo 1"
      className="h-16 w-auto mb-2"
    />
    <span className="text-[#2D3191] text-center">
      <span style={{ fontFamily: 'yekanbakh-regular' }}>دارنده بیش از 1000 مشترک صنعتی فعال  ظرفیت مصرفی بیش از 2500 مگاوات</span>
    </span>
  </div>

  <div className="flex flex-col items-center">
    <img
      src="/img/5.PNG"
      alt="Logo 1"
      className="h-16 w-auto mb-2"
    />
    <span className="text-[#2D3191] text-center">
      <span style={{ fontFamily: 'yekanbakh-regular' }}>دارنده بيشترین سهم بازار از نظر  ظرفيت و تعداد مشتركين</span>
    </span>
  </div>

  <div className="flex flex-col items-center">
    <img
      src="/img/4.PNG"
      alt="Logo 1"
      className="h-16 w-auto mb-2"
    />
    <span className="text-[#2D3191] text-center">
      <span style={{ fontFamily: 'yekanbakh-regular' }}>ارائه خدمات مشاوره و پشتيبانی درخصوص برق پایدار</span>
    </span>
  </div>
</div>

<div className="relative  pt-7 mt-7 px-8 py-4 border-2 border-[#2D3191] rounded-xl ">

<div className="absolute right-5 sm:right-10 top-0 transform -translate-y-1/2 px-6 sm:px-16 py-2 bg-[#2D3191] rounded-full text-white text-center text-sm sm:text-base" style={{ fontFamily: 'yekanbakh-bold' }}>
  مراحل خرید در برقآپ
</div>

<div className="grid grid-cols-1 sm:grid-cols-9 gap-2 text-center mt-10">

  <div className="flex flex-col items-center">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-black flex items-center justify-center text-lg sm:text-xl font-bold text-black">
      1
    </div>
    <span className="mt-2 text-xs  sm:text-base font-semibold text-center text-[#2D3191] leading-tight" style={{ fontFamily: 'yekanbakh-Bold' }}>
      ثبت‌نام و ورود به سامانه برق<span className="text-red-600">آپ</span>
    </span>
  </div>

  <div className="flex sm:flex-row flex-col justify-center items-center ">
    <span className=" text-red-600  text-3xl sm:text-4xl sm:rotate-0 rotate-90 items-center">→</span>
  </div>

  <div className="flex flex-col items-center">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-black flex items-center justify-center text-lg sm:text-xl font-bold text-black">
      2
    </div>
    <span className="mt-2 text-xs sm:text-base font-semibold text-center text-[#2D3191] leading-tight" style={{ fontFamily: 'yekanbakh-Bold' }}>
      عقد قرارداد دو جانبه در سامانه برق<span className="text-red-600">آپ</span>
    </span>
  </div>

 
  <div className="flex sm:flex-row flex-col justify-center items-center">
    <span className="text-red-600 text-3xl sm:text-4xl sm:rotate-0 rotate-90">→</span>
  </div>

  
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-black flex items-center justify-center text-lg sm:text-xl font-bold text-black">
      3
    </div>
    <span className="mt-2 text-xs sm:text-base font-semibold text-center text-[#2D3191] leading-tight" style={{ fontFamily: 'yekanbakh-Bold' }}>
      قرائت دقیق مصرف بصورت آنلاین توسط سامانه برق<span className="text-red-600">آپ</span>
    </span>
  </div>

  <div className="flex sm:flex-row flex-col justify-center items-center">
    <span className="text-red-600 text-3xl sm:text-4xl sm:rotate-0 rotate-90">→</span>
  </div>

 
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-black flex items-center justify-center text-lg sm:text-xl font-bold text-black">
      4
    </div>
    <span className="mt-2 text-xs sm:text-base font-semibold text-center text-[#2D3191] leading-tight" style={{ fontFamily: 'yekanbakh-Bold' }}>
      دریافت صورت‌حساب در سامانه برق<span className="text-red-600">آپ</span>
    </span>
  </div>


  <div className="flex sm:flex-row flex-col justify-center items-center">
    <span className="text-red-600 text-3xl sm:text-4xl sm:rotate-0 rotate-90">→</span>
  </div>

 
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-black flex items-center justify-center text-lg sm:text-xl font-bold text-black">
      5
    </div>
    <span className="mt-2 text-xs sm:text-base font-semibold text-center text-[#2D3191] leading-tight" style={{ fontFamily: 'yekanbakh-Bold' }}>
      تخصیص برق و اعلام به مدیریت شبکه توسط  سامانه برق<span className="text-red-600">آپ</span>
    </span>
  </div>

</div>
</div>



<div className="relative   mt-7 px-8 sm:px-20 py-1 border-2 border-[#2D3191] rounded-xl ">
  

  <div className="absolute right-2 sm:right-10 top-2 sm:top-6 transform -translate-y-6 sm:-translate-y-12 px-6 sm:px-20 py-1 sm:py-2 bg-[#2D3191] rounded-full text-white text-center text-lg sm:text-base"  style={{ fontFamily: 'yekanbakh-Bold'}}>
    تماس و راهنمایی
  </div>

 
  <div className="bg-white text-right p-4 sm:p-6 space-y-4 font-sans leading-relaxed text-lg">

  
    <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-2 text-[#2D3191]">
      <img src="/img/10.PNG" alt="Website Icon" className="w-10 h-10 mt-2 sm:w-12 sm:h-12 pr-0 order-1 sm:order-3" />
     <span className=" text-base sm:text-lg md:whitespace-nowrap order-2" style={{ fontFamily: 'yekanbakh-Bold' }}>
        لینک سایت جهت کسب اطلاعات بیشتر
      </span>
      <div className="text-red-600 font-semibold text-base pb-2 pr-8 sm:text-lg hover:underline cursor-pointer order-3 sm:order-1">www.Barghapp.com</div>
      
      
    </div>      

 
    <div className="flex flex-row sm:flex-row items-start sm:items-center  gap-2" dir="rtl">
    <img src="/img/11.PNG" alt="Support Icon" className="w-10 h-10 sm:w-12 sm:h-12 mt-2 sm:mt-0" />
      <p className="text-base md:text-lg sm:text-lg text-[#2D3191]"dir="rtl" style={{ fontFamily: 'yekanbakh-Bold' }}>
        کارشناس پشتیبان شما
        <span className="text-red-600 font-bold px-1" style={{ fontFamily: 'yekanbakh-Bold' }}>آقای ..........</span>
        می‌باشند. برای شروع همکاری یا دریافت مشاوره رایگان با شماره
        <span className="font-bold px-1" dir="rtl">021-91011522</span>
        و داخلی
        <span className="font-bold px-1">..........</span>
        تماس حاصل فرمایید.
      </p>
     
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default ReportPageOne;
