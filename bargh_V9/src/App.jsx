import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import BaseInfo from "./assets/Components/BaseInfo";
import Input from "./assets/Components/Inpute";
import Output from "./assets/Components/Output";
import Report from "./assets/Components/Report";
import Notfound from "./assets/Components/NotFound";
import Login from "./assets/Components/Login";
import NotFounduser from "./assets/Components/Notfounduser";
import 'font-awesome/css/font-awesome.min.css';

export const EntryTimeContext =createContext()
function App() {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [entryTime, setEntryTime] = useState({ date: "", time: "" });

	// useEffect(() => {
	// 	const now = new Date();
	// 	setEntryTime({
	// 	  date: now.toLocaleDateString("fa-IR"),
	// 	  time: now.toLocaleTimeString("fa-IR"),
	// 	});
	//   }, []);

	useEffect(() => {
		// اگر فرم ارسال نشده باشد، localStorage پاک می‌شود
		if (!isFormSubmitted) {
			localStorage.removeItem("baseInfo");
		}
	}, [isFormSubmitted]);

	

	return (

		<EntryTimeContext.Provider value={{entryTime,setEntryTime}}>
		
		<BrowserRouter>
			<Routes>
			    <Route path="/" element={<Login/>}/>
				<Route
					path="/baseinfo"
					element={<BaseInfo setIsFormSubmitted={setIsFormSubmitted} />}
				/>

				{/* محافظت از مسیر /input */}
				<Route
					path="/input"
					element={
						localStorage.getItem("baseInfo") ? (
							<Input />
						) : (
							<Navigate to="/NotFound" />
						)
					}
				/>
				
				{/* محافظت از مسیر /output */}
				<Route
					path="/output"
					element={
						localStorage.getItem("baseInfo") ? (
							<Output />
						) : (
							<Navigate to="/NotFound" />
						)
					}
				/>

				{/* محافظت از مسیر /Report */}
				<Route
					path="/Report"
					element={
						localStorage.getItem("baseInfo") ? (
							<Report />
						) : (
							<Navigate to="/NotFound" />
						)
					}
				/>
				
				{/* صفحه‌ی NotFound */}
				<Route path="/NotFound" element={<Notfound />} />
				<Route path="/Notfounduser" element={<NotFounduser/>}/>
			</Routes>
		</BrowserRouter>
		</EntryTimeContext.Provider>
	);
}

export default App;
