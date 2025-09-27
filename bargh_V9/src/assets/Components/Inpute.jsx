import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header.jsx";


const inputFields = [
    { name: "Input_Bill_Image", label: "تحلیل قبض مشترک", type: "text", placeholder: "نام مشترک را بصورت کامل وارد نمایید" },
    { name: "Input_Analysis_Period", label: "دوره تحلیل", type: "select", placeholder: "دوره را انتخاب نمایید" },
    { name: "Input_Upload_Bill", label: "بارگذاری تصویر قبض مشترک(اختیاری)", type: "file", placeholder: "قبض مشترک را بارگذاری نمایید" },
    { name: "Input_Low_Load_Energy", label: "انرژی کم باری مصرفی کنتور (کیلووات/ساعت )", type: "number", placeholder: "عدد انرژی را وارد نمایید" },
    { name: "Input_Mid_Load_Energy", label: "انرژی میان باری مصرفی کنتور (کیلووات/ساعت )", type: "number", placeholder: "عدد انرژی را وارد نمایید" },
    { name: "Input_High_Load_Energy_Normal", label: "انرژی اوج باری مصرفی کنتور (کیلووات/ساعت )", type: "number", placeholder: "عدد انرژی را وارد نمایید" },
    { name: "Input_High_Load_Energy_Friday", label: " انرژی جمعه باری مصرفی کنتور (کیلووات/ساعت )", type: "number", placeholder: "عدد انرژی را وارد نمایید" },
    { name: "Input_Low_Load_OurPrice", label: "نرخ فروش کم باری برقآپ", type: "number", placeholder: "عدد مبلغ را به ريال وارد نمایید", isRial: true },
    { name: "Input_Mid_Load_OurPrice", label: "نرخ فروش میان باری برقآپ", type: "number", placeholder: "عدد مبلغ را به ريال وارد نمایید", isRial: true },
    { name: "Input_High_Load_OurPrice", label: "نرخ فروش اوج برقآپ", type: "number", placeholder: "عدد مبلغ را به ريال وارد نمایید", isRial: true },
    { name: "Input_Base_Load_OurPrice", label: "نرخ فروش بار پایه برقآپ", type: "number", placeholder: "عدد مبلغ را به ريال وارد نمایید", isRial: true },
    { name: "Input_Costumer_Choice_Pre", label: "توان پایه (تجربه خرید پیشین)", type: "number", placeholder: "عدد توان تجربه پیشین را وارد نمایید", isRial: true },
    { name: "Input_Costumer_Choice_Pre_Price", label: "نرخ فروش (تجربه خرید پیشین)", type: "number", placeholder: "عدد مبلغ تجربه پیشین را به ريال وارد نمایید", isRial: true },

    { name: "Input_Reactive_Energy_Price", label: "( کیلووات) مقدار انرژی ری اکتیو", type: "number", placeholder: "عدد را وارد نمایید"},
    { name: "Input_Contract_Power", label: "( کیلووات) قدرت قراردادی", type: "number", placeholder: "عدد را وارد نمایید" },
    { name: "Input_Use_Power", label: "( کیلووات) قدرت مصرف", type: "number", placeholder: "عدد را وارد نمایید" },
  ];


function Input() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
   
    useEffect(() => {
      const savedBaseInfo = localStorage.getItem("baseInfo");
      if (!savedBaseInfo) {
        navigate("/output");
      }
    }, [navigate]);
  
  
    useEffect(() => {
      const savedBaseInfo = localStorage.getItem("baseInfo");
      if (savedBaseInfo) {
        const baseInfo = JSON.parse(savedBaseInfo);
    
        const extractedData = {
          Input_Low_Load_Energy: baseInfo.Input_Low_Load_Energy,
          Input_Mid_Load_Energy: baseInfo.Input_Mid_Load_Energy,
          Input_High_Load_Energy_Normal: baseInfo.Input_High_Load_Energy_Normal,
          Input_High_Load_Energy_Friday: baseInfo.Input_High_Load_Energy_Friday,
          Input_Low_Load_OurPrice: baseInfo.Input_Low_Load_OurPrice,
          Input_Mid_Load_OurPrice: baseInfo.Input_Mid_Load_OurPrice,
          Input_High_Load_OurPrice: baseInfo.Input_High_Load_OurPrice,
          Input_Base_Load_OurPrice: baseInfo.Input_Base_Load_OurPrice,
          Input_Costumer_Choice_Pre: baseInfo.Input_Costumer_Choice_Pre || '0',
          Input_Costumer_Choice_Pre_Price: baseInfo.Input_Costumer_Choice_Pre_Price || '0',
          Input_Reactive_Energy_Price: baseInfo.Input_Reactive_Energy_Price,
          Input_Contract_Power: baseInfo.Input_Contract_Power,
        };
        setFormData((prev) => ({ ...prev, ...extractedData }));
      }
    }, []);

    const formatNumber = (val) => {
      if (!val) return "";
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }; 


    const energyInputs = [
      "Input_Low_Load_Energy",
      "Input_Mid_Load_Energy",
      "Input_High_Load_Energy_Normal",
      "Input_High_Load_Energy_Friday",
      "Input_Low_Load_OurPrice",
      "Input_Mid_Load_OurPrice",
      "Input_High_Load_OurPrice",
      "Input_Base_Load_OurPrice",
      "Input_Costumer_Choice_Pre_Price",
      "Input_Reactive_Energy_Price",
      "Input_Contract_Power",
      "Input_Use_Power"
    ];
    

    const lastRowInputs = [
      "Input_Reactive_Energy_Price",
      "Input_Contract_Power",
      "Input_Use_Power",
    ];

    const decimalAllowedInputs = [
      "Input_Low_Load_OurPrice",
      "Input_Mid_Load_OurPrice",
      "Input_High_Load_OurPrice",
      "Input_Base_Load_OurPrice",
      "Input_Costumer_Choice_Pre_Price"
    ];
    
    const handleChange = (e) => {
      const { name, value, files, type } = e.target;
      const field = inputFields.find((f) => f.name === name);
      const isNumber = field?.type === "number";
    
    


      if (type === "file") {

        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {

            setFormData((prev) => ({ ...prev, [name]: reader.result }));
            setErrors((prev) => ({ ...prev, [name]: "" })); 
          };
          reader.readAsDataURL(file); 
        }
      } else if (isNumber) {
        const rawValue = value.replace(/,/g, "");
        const isDecimal=decimalAllowedInputs.includes(name)
        const decimalRegex = isDecimal? /^\d*\.?\d*$/ : /^\d*$/;
        if (rawValue && !decimalRegex.test(rawValue)) {
          setErrors((prev) => ({ ...prev, [name]: "فقط عدد وارد نمایید" }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: rawValue })); 
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    };
    
    
    
    const validate = () => {
      const newErrors = {};
      let isValid = true;
    
      inputFields.forEach(({ name, type }) => {

        if (
          (name === "Input_Costumer_Choice_Pre" || name === "Input_Costumer_Choice_Pre_Price") &&
          !formData[name]
        ) {
          return; 
        }

        if (type !== "file" && !formData[name]) {
          newErrors[name] = "این فیلد نباید خالی باشد";
          isValid = false;
        } else if (type === "number" && formData[name] && !/^\d*\.?\d*$/.test(formData[name])) {
          newErrors[name] = "فقط عدد وارد نمایید";
          isValid = false;
        }
      });
    
      setErrors(newErrors);
      return isValid;
    };
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validate()) {
        const savedBaseInfo = localStorage.getItem("baseInfo");
        const baseInfo = savedBaseInfo ? JSON.parse(savedBaseInfo) : {}; 
        //console.log("داده‌های قبلی:", baseInfo); 
    

        const finalData = { ...baseInfo, ...formData };
        //console.log("داده‌های ترکیب شده:", finalData);
    

        const reactiveEnergyPrice = formData.Input_Reactive_Energy_Price || "مقدار وارد نشده";
        const contractPower = formData.Input_Contract_Power || "مقدار وارد نشده";
        const usePower = formData.Input_Use_Power || "مقدار وارد نشده";
        const BillImage = formData.Input_Upload_Bill || "مقدار وارد نشده";
    

        const jsonContent = JSON.stringify(finalData, null, 2);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const url = URL.createObjectURL(blob);
    
        URL.revokeObjectURL(url);
        localStorage.setItem("inputInfo", JSON.stringify(finalData));
        navigate("/output"); 
      }
    };
    
    
    
    return (
      <div className="min-h-screen w-full bg-white text-right" dir="rtl"  style={{ fontFamily: "yekanbakh-bold", color: "#2D3191" }}>
        <Header  />
  
        <div className="px-[5%] py-10 w-full" >
        <form onSubmit={handleSubmit}  className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10" style={{ fontFamily: "yekanbakh-bold"}}>
  {inputFields
    .filter((field) => !lastRowInputs.includes(field.name)) 
    .map((field, index) => {
      const { name, label, type, placeholder, isRial } = field;



    if (name === "Input_Customer_Power_Choice") {
      const nextField = inputFields[index + 1];
      return (
        <div key={name + "-group"} className="md:col-span-2 flex gap-6" >
          {[field, nextField].map(({ name, label, type, placeholder, isRial }) => {
            const hasElectricity = label.includes("برق");
            const [before, after] = hasElectricity ? label.split("برق") : [label, ""];
            return (
              <div key={name} className="flex flex-col w-full" >
                <label htmlFor={name}  style={{ fontFamily: "yekanbakh-bold"}} className="text-xl mb-2 pr-1 flex justify-between items-center">
                  <span>
                    {hasElectricity ? (
                      <>
                        <span className="text-[#2D3191]">{before}</span>
                        <span className=" text-[#E1313A]">برق</span>
                        <span className="text-[#2D3191]">{after}</span>
                      </>
                    ) : label}
                  </span>
                </label>
                
                <div className="relative">
                <input
                id={name}
                name={name}
                type="text"
                inputMode={type === "number" ? "numeric" : undefined}
                value={energyInputs.includes(name)
                  ? formatNumber(formData[name] || "")
                  : formData[name] || ""}
                onChange={handleChange}
                placeholder={placeholder}
                
                className="p-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3191] placeholder:text-sm placeholder-gray-400 w-full border border-[#2D3191] bg-gray-50 text-[#2D3191]"
              />
                  {isRial && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D3191] text-xs">ریال</span>
                  )}
                </div>
                {errors[name] && <p className=" text-[#E1313A] text-sm mt-1 pr-2">{errors[name]}</p>}
              </div>
            );
          })}
        </div>
      );
    }

    if (name === "Input_Readioactive_Energy_Price") {
      const nextField = inputFields[index + 1];
      return (
        <div key={name + "-group"} className="md:col-span-2 flex gap-6" >
          {[field, nextField].map(({ name, label, type, placeholder, isRial }) => {
            const hasElectricity = label.includes("برق");
            const [before, after] = hasElectricity ? label.split("برق") : [label, ""];
            return (
              <div key={name} className="flex flex-col w-full">
                <label htmlFor={name}  className="text-xl mb-2 pr-1 flex justify-between items-center" style={{ fontFamily: "yekanbakh-bold"}}>
                  <span>
                    {hasElectricity ? (
                      <>
                        <span className="text-[#2D3191]">{before}</span>
                        <span className=" text-[#E1313A]">برق</span>
                        <span className="text-[#2D3191]">{after}</span>
                      </>
                    ) : label}
                  </span>

                </label>
                <div className="relative">
                  <input
                    id={name}
                    name={name}
                    type="text"
                    inputMode={type === "number" ? "numeric" : undefined}
                    value={ energyInputs.includes(name)
                      ? formatNumber(formData[name] || "")
                      : formData[name] || ""}
                    onChange={handleChange}
                    placeholder={placeholder}
              
                    className="p-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3191] placeholder:text-sm placeholder-gray-400 w-full border border-[#2D3191] bg-gray-50 text-[#2D3191]"
                  />
                  {isRial && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D3191] text-xs"></span>
                  )}
                </div>
                {errors[name] && <p className=" text-[#E1313A] text-sm mt-1 pr-2">{errors[name]}</p>}
              </div>
            );
          })}
        </div>
        
      );
      
    }

    

    const hasElectricity = label.includes("برق");
    const [before, after] = hasElectricity ? label.split("برق") : [label, ""];
    
    return (
      <div key={name} className={`flex flex-col ${name === "Input_Bill_Image" ? "md:col-span-2" : ""}`}>
        <label htmlFor={name}  style={{ fontFamily: "yekanbakh-bold, sans-serif"}} className="text-xl mb-2 pr-1 flex justify-between items-center">
          <span>
            {hasElectricity ? (
              <>
                <span className="text-[#2D3191]">{before}</span>
                <span className=" text-[#E1313A]">برق</span>
                <span className="text-[#2D3191]">{after}</span>
              </>
            ) : label}
          </span>
        </label>
        <div className="relative">
        {type === "select" ? (
  <select
    id={name}
    name={name}
    value={energyInputs.includes(name)
      ? formatNumber(formData[name] || "")
      : formData[name] || ""}
    onChange={handleChange}
    className="py-2.5 px-5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3191] border border-[#2D3191] w-full bg-gray-50 text-gray-500"
  >
    <option value="">دوره را انتخاب کنید</option>
    {[
      "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", 
      "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
    ].map((month, index) => (
      <option key={index} value={index + 1}>
        {month}
      </option>
    ))}
  </select>
          
            ) :  type === "file" ? (
            <div className="relative">
              <label
                htmlFor={name}
                className="flex items-center justify-between border border-[#2D3191] bg-gray-50 rounded-md p-3 cursor-pointer hover:brightness-105"
              >
                <span className="text-sm text-gray-500 overflow-hidden">
                  {formData[name] || placeholder}
                </span>
                <img src="/img/upload-icon.png" alt="آپلود" className="w-6 h-6" />
              </label>
              <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          ) : (
            <input
              id={name}
              name={name}
              type="text"
              inputMode={type === "number" ? "numeric" : undefined}
              value={energyInputs.includes(name)
                ? formatNumber(formData[name] || "")
                : formData[name] || ""}
              onChange={handleChange}
              placeholder={placeholder}
              className="p-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D3191] placeholder:text-sm placeholder-gray-400 w-full border border-[#2D3191] bg-gray-50 text-[#2D3191]"
            />
          )}
          {isRial && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D3191] text-xl">ریال</span>
          )}
        </div>
        {errors[name] && <p className=" text-[#E1313A] text-sm mt-1 pr-2">{errors[name]}</p>}
      </div>
    );
  })}
  <div className="md:col-span-4 flex flex-col md:flex-row gap-6">
  {inputFields
    .filter((field) => lastRowInputs.includes(field.name))
    .map(({ name, label, type, placeholder, isRial }) => (
      <div key={name} className="flex flex-col flex-1">
        <label htmlFor={name} className="text-xl mb-2 pr-1" dir="ltr">{label}</label>
        <input
          id={name}
          name={name}
          type="text"
          inputMode={type === "number" ? "numeric" : undefined}
          value={energyInputs.includes(name)
            ? formatNumber(formData[name] || "")
            : formData[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className="p-3 text-sm rounded-md border border-[#2D3191] bg-gray-50 text-[#2D3191]"
          
        />
        {isRial && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D3191] text-sm">ریال</span>}
        {errors[name] && <p className="text-[#E1313A] text-sm mt-1 pr-2">{errors[name]}</p>}
      </div>
    ))}
</div>

  <div className="col-span-full mt-60 flex justify-center">
    <button type="submit" className="text-[30px] bg-[#2D3191] text-white py-2 px-10 rounded-[15px] hover:brightness-110 transition-all shadow-md w-[100%]">
      محاسبه
    </button>
  </div>
</form>


        </div>
      </div>
    );
  }
  
  export default Input;