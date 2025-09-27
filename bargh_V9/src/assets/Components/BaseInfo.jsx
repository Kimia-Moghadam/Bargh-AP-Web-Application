import { useContext, useEffect, useState } from "react";
import Header from "./header.jsx";
import { useNavigate } from "react-router-dom";
import { EntryTimeContext } from "../../App.jsx";


const fieldConfigs = [
  { name: "Input_Month", label: "ماه دوره تحلیل", placeholder: "ماه دوره را انتخاب کنید", type: "select" },
  { name: "Input_No_Days", label: "تعداد روز محاسبه", placeholder: "تعداد روز را انتخاب نمایید", type: "select" },
  { name: "Input_No_Fridays", label: "تعداد روز جمعه‌ دوره", placeholder: "تعداد روز را انتخاب نمایید", type: "select" },
  { name: "Input_Low_Load_Hours", label: "ساعات کم‌بار (TOU)", placeholder: "عدد وارد نمایید", type: "number" , maxlength:'2'},
  { name: "Input_Mid_Load_Hours", label: "ساعات میان‌بار (TOU)", placeholder: "عدد وارد نمایید", type: "number" , maxlength:'2' },
  { name: "Input_High_Load_Hours", label: "ساعات اوج‌بار (TOU)", placeholder: "عدد وارد نمایید", type: "number" , maxlength:'2' },
  { name: "Input_Low_Load_Electricity_Market_Price_Max", label: "نرخ حداکثر بازار (کم‌بار)", placeholder: "نرخ را وارد نمایید", type: "number", isRial: true },
  { name: "Input_Mid_Load_Electricity_Market_Price_Max", label: "نرخ حداکثر بازار (میان‌بار)", placeholder: "نرخ را وارد نمایید", type: "number", isRial: true },
  { name: "Input_High_Load_Electricity_Market_Price_Max", label: "نرخ حداکثر بازار  (اوج‌بار)", placeholder: "نرخ را وارد نمایید", type: "number", isRial: true },
  { name: "Input_Low_Load_Stock_Market_Price_Avg", label: "میانگین نرخ بازار بورس (کم‌بار)", placeholder: "نرخ را وارد نمایید", type: "number", isRial: true },
  { name: "Input_Mid_Load_Stock_Market_Price_Avg", label: "میانگین نرخ بازار بورس (میان‌بار)", placeholder: "نرخ را وارد نمایید", type: "number", isRial: true },
  { name: "Input_High_Load_Stock_Market_Price_Avg", label: "میانگین نرخ بازار بورس (اوج‌بار)", placeholder: "نرخ را وارد نمایید", type: "number", isRial: true },
];

const monthDays = {
  1: 31,   
  2: 31,  
  3: 31,   
  4: 31,   
  5: 31,  
  6: 31,   
  7: 30,   
  8: 30,   
  9: 30,  
  10: 30,  
  11: 30,  
  12: 29,  
};



function InputField({ config, value, onChange, error, baseInfo }) {
  const { name, label, placeholder, type, isRial ,maxlength} = config;

  const formatNumber = (val) => {
    if (!val) return "";
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/,/g, "");

    if (type === "number" && val ) {

      if(isRial){
        if(!/^\d*\.?\d*$/.test(val)){
          onChange(name, value, "فقط عدد وارد نمایید");
          return;
        }
      }else{
        if((!/^\d*$/.test(val))){
          onChange(name, value, "فقط عدد وارد نمایید");
          return;
        }
      }
      
    }

    if(maxlength && val.length>maxlength){
      val=val.slice(0,maxlength)
    }
    onChange(name, val, "");
  };

  return (
    <div className="relativ">
      <label htmlFor={name} style={{ fontFamily: "yekanbakh-bold, sans-serif" }} className="text-xl flex items-center justify-between mb-2 pr-1">
        <span>{label}</span>
      </label>

      <div className="relative">
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleInputChange}
            className={`py-2.5 px-5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3191] border border-[#2D3191] w-[96%] bg-gray-50 ${
              value === "" ? "text-gray-400" : "text-[#2D3191]"
            }`}
          >
            <option value="" disabled hidden>{placeholder}</option>

            {name === "Input_Month" && [
              "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", 
              "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
            ].map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
            {name === "Input_No_Days" && (
              <>
                {<>
                    <option value="29">روز 29</option>
                    <option value="30">روز 30</option>
                    <option value="31">روز 31</option>
                  </>
                }
              </>
            )}
            {name === "Input_No_Fridays" && (
              <>
                <option value="4">4 جمعه</option>
                <option value="5">5 جمعه</option>
              </>
            )}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type="text"
            inputMode="numeric"
            value={isRial? formatNumber(value) : value}
            onChange={handleInputChange}
            placeholder={placeholder}
            
            className="p-5 h-10 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3191] placeholder:text-sm placeholder-gray-400 w-[96%] border border-[#2D3191] bg-gray-50 pl-10"
          />
        )}
        {isRial && (
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2D3191] text-xl">ریال</span>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-1 pr-2">{error}</p>}
    </div>
  );
}

function BaseInfo({ setIsFormSubmitted }) {
  const navigate = useNavigate();
  

  const [baseInfo, setBaseInfo] = useState(() =>
    Object.fromEntries(fieldConfigs.map(({ name }) => [name, ""]))
  );


  const [errors, setErrors] = useState({});


  const handleChange = (name, value, fieldError = "") => {
    setBaseInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    for (const { name, type, isRial } of fieldConfigs) {
      const value = baseInfo[name];
      if (!value) {
        isValid = false;
        newErrors[name] = "این فیلد نباید خالی باشد";
      } else if (type === "number" && !/^\d+$/.test(value)) {
        if (isRial) {
         
          if (!/^\d+(\.\d+)?$/.test(value)) {
            isValid = false;
            newErrors[name] = "فقط عدد یا عدد اعشاری وارد نمایید";
          }
        } else {
          
          if (!/^\d+$/.test(value)) {
            isValid = false;
            newErrors[name] = "فقط عدد وارد نمایید";
          }
        }
      }
    }
    const low = Number(baseInfo.Input_Low_Load_Hours) || 0;
    const mid = Number(baseInfo.Input_Mid_Load_Hours) || 0;
    const high = Number(baseInfo.Input_High_Load_Hours) || 0;
  
    if (low + mid + high !== 24) {
      isValid = false;
      newErrors.Input_Low_Load_Hours = "جمع ساعات کم‌بار، میان‌بار و اوج‌بار باید 24 باشد";
      newErrors.Input_Mid_Load_Hours = "جمع ساعات کم‌بار، میان‌بار و اوج‌بار باید 24 باشد";
      newErrors.Input_High_Load_Hours = "جمع ساعات کم‌بار، میان‌بار و اوج‌بار باید 24 باشد";
    }
  
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("baseInfo", JSON.stringify(baseInfo));
      setIsFormSubmitted(true);  
      navigate("/input");  
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-right" dir="rtl" style={{ fontFamily: "yekanbakh-bold", color: "#2D3191" }}>
      <Header />

      <div className="px-[5%] py-20 w-full">
        <h2 className="text-3xl font-bold mb-20" style={{ fontFamily: "yekanbakh-bold", color: "#2D3191" }}>ثبت اطلاعات پایه</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-[10%] gap-y-12 max-w-full"
          style={{ fontFamily: "yekanbakh-bold"}}
        >
          {fieldConfigs.map((config) => (
            <InputField
              key={config.name}
              config={config}
              value={baseInfo[config.name]}
              onChange={handleChange}
              error={errors[config.name]}
              baseInfo={baseInfo} 
              style={{ fontFamily: "yekanbakh-bold"}}
            />
          ))}

          <div className="col-span-full mt-60 flex justify-center">
            <button
              type="submit"
              style={{ fontFamily: "yekanbakh-bold"}}
              className="text-[25px] bg-[#2D3191] text-white py-2 px-10 rounded-[15px] hover:brightness-110 transition-all text-xl shadow-md w-full"
            >
              ثبت اطلاعات پایه
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BaseInfo;
