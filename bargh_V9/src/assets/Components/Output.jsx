import { useEffect, useState } from "react";
import Header from "./header.jsx";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const allFields = [
	{
		name: "Price_WO_Contract_1",
		label: "تأمین‌کننده (برق عادی)",
		isRial: true,
	},
	{ name: "Price_WO_Contract_3", label: "اداره برق (برق عادی)", isRial: true },
	{
		name: "Price_WO_Contract_Total",
		label: "پرداختی کل بابت انرژی",
		isRial: true,
	},
	{
		name: "Price_WO_Contract_4",
		label: "بستانکاری خارج از بازار",
		isRial: true,
	},
	{ name: "Price_WO_Contract_5", label: "بهای کل با مالیات", isRial: true },

	{
		name: "Price_Seperate_Contract_1",
		label: "تأمین‌کننده (برق عادی)",
		isRial: true,
	},
	{
		name: "Price_Seperate_Contract_3",
		label: "اداره برق (برق عادی)",
		isRial: true,
	},
	{
		name: "Price_Seperate_Contract_Total",
		label: "پرداختی کل بابت انرژی",
		isRial: true,
	},
	{
		name: "Price_Seperate_Contract_4",
		label: "بستانکاری خارج از بازار",
		isRial: true,
	},
	{
		name: "Price_Seperate_Contract_5",
		label: "بهای کل با مالیات",
		isRial: true,
	},
	{ name: "Price_Diff_5", label: "میزان سود مشترک", isRial: true },

	{ name: "Price_Base_V6_1", label: "تأمین‌کننده (برق عادی)", isRial: true },
	{ name: "Price_Base_V6_3", label: "اداره برق (برق عادی)", isRial: true },
	{ name: "Price_Base_V6_Total", label: "پرداختی کل بابت انرژی", isRial: true },
	{ name: "Price_Base_V6_4", label: "بستانکاری خارج از بازار", isRial: true },
	{ name: "Price_Base_V6_5", label: "بهای کل با مالیات", isRial: true },
	{ name: "Price_Base_V6_6", label: "میزان سود مشترک", isRial: true },

	{
		name: "Price_Base_Optimum_1",
		label: "تأمین‌کننده (برق عادی)",
		isRial: true,
	},
	{ name: "Price_Base_Optimum_3", label: "اداره برق (برق عادی)", isRial: true },
	{
		name: "Price_Base_Optimum_Total",
		label: "پرداختی کل بابت انرژی",
		isRial: true,
	},
	{
		name: "Price_Base_Optimum_4",
		label: "بستانکاری خارج از بازار",
		isRial: true,
	},
	{ name: "Price_Base_Optimum_5", label: "بهای کل با مالیات", isRial: true },
	{ name: "Price_Base_Optimum_6", label: "میزان سود مشترک", isRial: true },
];

function InputField({ config, value, onChange, error }) {
	const navigate = useNavigate();
	const { name, label, isRial } = config;
	useEffect(() => {
		const savedBaseInfo = localStorage.getItem("baseInfo");
		if (!savedBaseInfo) {
			navigate("/NotFound");
		}
	}, [navigate]);
	const handleInputChange = (e) => {
		const val = e.target.value.replace(/,/g, "");
		if (val === "") {
			onChange(name, "");
			return;
		}

		if (/^\d+$/.test(val)) {
			onChange(name, val);
		} else {
			onChange(name, "");
		}
	};

	const formatNumber = (val) => {
        const number = Number(val);
        let formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		if (config.label.includes("بستانکاری") && number>0) {
			return  formatted + "-";
			
		  }
		  return formatted;
    };

	return (
		<div className="relative w-full mt-6">
			<label
				htmlFor={name}
				className="absolute -top-3 right-4 bg-white px-1 text-xl text-[#44448c] font-semibold z-10"
				style={{ fontFamily: "yekanbakh-bold" }}
			>
				<span>{label}</span>
			</label>

			<div className="relative">
				<input
					id={name}
					name={name}
					type="text"
					inputMode="numeric"
					value={formatNumber(value)}
					onChange={handleInputChange}
					className="w-full h-14 border border-[#44448c] rounded-md px-4 pr-4 text-right text-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#44448c] pl-14"
					style={{ fontFamily: "yekanbakh-bold" }}
				/>
				{isRial && (
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[#44448c]">
						ریال
					</span>
				)}
			</div>

			{error && <p className=" text-[#E1313A] text-sm mt-1 pr-2">{error}</p>}
		</div>
	);
}

function Output() {
	const [formData, setFormData] = useState({});
	const [companyname,setCompanyname]=useState('')
	const navigate = useNavigate();

	useEffect(() => {
		const savedBaseInfo = JSON.parse(localStorage.getItem("baseInfo"));
		const saveInputInfo = JSON.parse(localStorage.getItem("inputInfo"));

		if(saveInputInfo && saveInputInfo.Input_Bill_Image){
			setCompanyname( saveInputInfo.Input_Bill_Image)
		}

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
						Number(data?.Price_WO_Contract?.[5]) ,

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
				setOutputInfo(newOutputInfo);

				localStorage.setItem("outputInfo", JSON.stringify(newOutputInfo));
			});
	}, []);


	const [outputInfo, setOutputInfo] = useState(() =>
		Object.fromEntries(allFields.map(({ name }) => [name, ""]))
	);
	// const [entryTime, setEntryTime] = useState({ date: "", time: "" });
	const [errors, setErrors] = useState({});

	// useEffect(() => {
	// 	const now = new Date();
	// 	setEntryTime({
	// 		date: now.toLocaleDateString("fa-IR"),
	// 		time: now.toLocaleTimeString("fa-IR"),
	// 	});
	// }, []);

	const handleChange = (name, value) => {
		setOutputInfo((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const validate = () => {
		const newErrors = {};
		let isValid = true;

		for (const { name } of allFields) {
			const value = outputInfo[name];
			if (!value) {
				isValid = false;
				newErrors[name] = "این فیلد نباید خالی باشد";
			} else if (!/^\d+$/.test(value)) {
				isValid = false;
				newErrors[name] = "فقط عدد وارد نمایید";
			}
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (validate()) {
		alert("اطلاعات خروجی ثبت شد.");
		navigate("/Report");
		// }
	};

	const columns = [
		allFields.slice(0, 5),
		allFields.slice(5, 11),
		allFields.slice(11, 17),
		allFields.slice(17, 23),
	];

	// function generatePDF() {
	// 	const sections = ["section1"];
	// 	const pdf = new jsPDF("p", "mm", "a4");
	  
	// 	let currentPage = 0;
	  
	// 	const captureSection = async (id, index) => {
	// 	  const element = document.getElementById(id);
	  
	// 	  if (!element) return;
	  
	// 	  const canvas = await html2canvas(element, { scale: 2 });
	// 	  const imgData = canvas.toDataURL("image/png");
	  
	// 	  const pdfWidth = pdf.internal.pageSize.getWidth();
	// 	  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
	  
	// 	  if (index > 0) pdf.addPage();
	// 	  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
	// 	};
	  
	// 	(async () => {
	// 	  for (let i = 0; i < sections.length; i++) {
	// 		await captureSection(sections[i], i);
	// 	  }
	// 	  pdf.save("گزارش.pdf");
	// 	})();
	//   }

	return (
		<div
			className="min-h-screen w-full bg-white text-right"
			dir="rtl"
			style={{ fontFamily: "yekanbakh-bold", color: "#44448c" }}
			id="section1"
		>
			<Header />

			<div className="px-[5%] py-10 w-full">
				<div className="flex items-center gap-6 mb-10">
					<h2 className="text-3xl font-bold whitespace-nowrap">
						 تحلیل قبض شرکت {companyname} 
						
					</h2>
					<img
						src="/img/download-icon.png"
						alt="دانلود"
						className="h-15 w-15 cursor-pointer mr-20"
					/>
					<h2 className="text-2xl font-bold whitespace-nowrap">
						دانلود قبض مشتری
					</h2>
				</div>

				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 lg:grid-cols-4 gap-x-[5%] gap-y-5 max-w-full"
				>
					<div className="lg:col-span-1 text-center mb-5 font-semibold text-2xl text-[#44448c]">
						<p>
							بهای برق پرداختی <br />
							بدون قرارداد دوجانبه
						</p>
					</div>
					<div className="lg:col-span-1 text-center mb-5 font-semibold text-2xl text-[#44448c]">
						<p>
							بهای برق پرداختی <br /> با قرارداد دوجانبه دیگری
						</p>
					</div>
					<div className="lg:col-span-1 text-center mb-4 font-semibold text-2xl text-[#44448c]">
						<p>
							بهای برق پرداختی <br /> با قرارداد دوجانبه{" "}
							<span className=" text-[#E1313A] ">برق</span>اپ (تفکیکی)
						</p>
					</div>
					<div className="lg:col-span-1 text-center mb-4 font-semibold text-2xl text-[#44448c]">
						<p>
							بهای برق پرداختی <br /> با قرارداد دوجانبه{" "}
							<span className=" text-[#E1313A] ">برق</span>اپ (پایه)
						</p>
					</div>

					{columns.map((group, colIndex) => (
						<div key={colIndex} className="flex flex-col gap-10">
							{group.map((config) => (
								<InputField
									key={config.name}
									config={config}
									value={outputInfo[config.name]}
									onChange={handleChange}
									error={errors[config.name]}
								/>
							))}
						</div>
					))}

					<div className="col-span-full mt-14 px-[px]">
						<div className="flex justify-between gap-[50px]">
							<button
								type="submit"
								// onClick={generatePDF}
								className="text-2xl bg-[#44448c] text-white py-2 px-0 rounded-[15px] hover:brightness-110 transition-all shadow-md w-1/2"
							>
								خروجی گزارش
							</button>

							<button
								type="button"
								className="text-2xl bg-[#44448c] text-white py-2 px-0 rounded-[15px] hover:brightness-110 transition-all shadow-md w-1/2"
								onClick={() => navigate("/input")}
							>
								بازگشت
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Output;
