import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EntryTimeContext } from "../../App"

function Login(){
const [usernamedata,setusernamedata]=useState('')
const [passwordata,setpassworddata]=useState('')
const [showpassword,setshowpassword]=useState(false)
const {setEntryTime}=useContext(EntryTimeContext)
const navigate=useNavigate()

const users=[
    {username:"admin", password:12345, role:"admin"},
    {username:"user", password:123 , role:"user"},
    

]

const usernamevalue=(e)=>{
    setusernamedata(e.target.value)
}

const passwordvalue=(e)=>{
    setpassworddata(e.target.value)
}

const togglepassword=()=>{
 
  setshowpassword(!showpassword)
}


const checkvalue=(e)=>{
    e.preventDefault();
    const founduser=users.find((e)=>e.username===usernamedata && e.password===Number(passwordata))

    

    if(founduser){
     
      const now = new Date();
      setEntryTime({
        date: now.toLocaleDateString("fa-IR"),
        time: now.toLocaleTimeString("fa-IR"),
      });

   


        if(founduser.role==="admin"){
           navigate('/baseinfo')
           localStorage.setItem()
        }else if (founduser.role==="user"){
            navigate('/input')
    }
}else{
    navigate('/Notfounduser')
    }
    
}

    return(
        <>

     <section className="flex min-h-screen items-center justify-center w-full bg-gray-100">
      <form onSubmit={checkvalue} className="w-full max-w-sm m-2" >
        <div
          className="bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-xl "
        >
          <div className="text-center mb-8">
         
            <img src="/img/logo-barghman2.png" alt=""className="mx-auto w-24 h-24 rounded-lg "  />

            <hr className="my-4 w-52 border-t-2 border-gray-300 mx-auto rounded-full" />

            <h1 className="text-3xl font-bold text-indigo-600 p-4">صفحه ورود</h1>
            
           
          </div>

          <div className="space-y-5 ">
           
            <input
            dir="rtl"
              type="text"
              placeholder="نام کاربری"
              value={usernamedata}
              onChange={usernamevalue}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
            />
          
            <div className="w-full relative">
            <input
              dir="rtl"
              type={showpassword ? "text" : "password"}
              placeholder="رمز عبور"
              value={passwordata}
              onChange={passwordvalue}
              className="w-full px-4 py-3  rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
            />
            <span onClick={togglepassword}
             className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600"
             >
            <i className={showpassword ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>
            </span>
            </div>
          </div>

          <button
          
            
            type="submit"
            disabled={usernamedata === "" || passwordata === ""}
            className={`mt-6 w-full font-semibold py-3 rounded-xl shadow-md transition duration-300
                ${usernamedata === "" || passwordata === ""
                  ? "bg-gray-400 text-gray-200 "
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
          >
            ورود
          </button>
        </div>
        </form>
      </section>
        </>
    )
}

export default Login