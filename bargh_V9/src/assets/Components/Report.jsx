import React from "react";
import ReportPageOne from "./Report-Page1";
import ReportPageOnetwo from "./Report-Page1-2";
import ReportPagetwo from "./Report-Page2";
import GaugeComponent from "./Report-Page2-2";
import ReportPageTwotwo from "./Report-Page2-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ReportContainer() {

  function generatePDF() {
    const sections = ["section1", "section2", "section3"];
    const pdf = new jsPDF("p", "mm", "a4");
  
    let currentPage = 0;
  
    const captureSection = async (id, index) => {
      const element = document.getElementById(id);
  
      if (!element) return;
  
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      if (index > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    };
  
    (async () => {
      for (let i = 0; i < sections.length; i++) {
        await captureSection(sections[i], i);
      }
      pdf.save("گزارش تحلیل صورت حساب.pdf");
    })();
  }
  return (
  <>
        <div className="flex flex-col mx-5 "id="section1">
        <div className="w-full  " >
          <ReportPageOne />
        </div>
        <div className="w-full "  >
          <ReportPageOnetwo />
        </div>
       </div>
      

      <div className="flex flex-col  " >
        <div className="w-full " id="section2" >
          <ReportPagetwo />
        </div>
        <div className="w-full " id="section3" >
          <ReportPageTwotwo />
        </div>
      </div>
      <div className="text-center m-10">
        <button
          dir="ltr"
          onClick={generatePDF}
          className="bg-[#2D3191] text-white px-8 py-2 rounded-lg shadow-md hover:bg-indigo-500"
        >
          PDF دانلود 
        </button>
      </div>
    </>
  );
}
export default ReportContainer;
