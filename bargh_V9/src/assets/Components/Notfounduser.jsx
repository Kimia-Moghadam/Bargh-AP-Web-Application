import { useNavigate } from "react-router-dom";

function NotFounduser(){
    const navigate=useNavigate()

    const gologin=()=>{
        navigate("/")
    }
    return(
        <>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-20 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">کاربر یافت نشد</h1>
        <p className="text-gray-600" dir="rtl">نام کاربری یا رمز عبور اشتباه است یا چنین کاربری وجود ندارد.</p>
        <button onClick={gologin} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300">
            بازگشت به صفحه ورود
        </button>
      
      </div>
     
    </div>
        </>
    )
}

export default NotFounduser;