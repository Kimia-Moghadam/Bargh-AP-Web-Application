import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';
import exporting from 'highcharts/modules/exporting';
import cylinder from 'highcharts/modules/cylinder';

highcharts3d(Highcharts);
exporting(Highcharts);
cylinder(Highcharts);

const EnergyChart = () => {
    const [dataa,setdataa]=useState({})


useEffect(() => {
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
                setdataa(data); 
				//localStorage.setItem("outputInfo", JSON.stringify(newOutputInfo));
			});
	}, []);

 


useEffect(()=>{
        const priceWOC = dataa.Price_WO_Contract || [];
        const priceBaseOptimum = dataa.Price_Base_Optimum || [];
        const pricesep = dataa.Price_Seperate_Contract || [];
        const pricev6 = dataa.Price_Base_V6|| [];


        const priceWOC5=priceWOC[5] || 0;
        const priceWOC5_opt5=priceWOC[5]- priceBaseOptimum[5];
        const price1= priceBaseOptimum[5];
        const price2= (pricesep[5]);
        const price2_WOC= priceWOC5 - (pricesep[5]);        
        const price3= (pricev6[5]);
        const price3_WOC = priceWOC5 - price3
        

Highcharts.chart('container', {
    chart: {
        type: 'column',
        style: {
            fontFamily: "yekanbakh-bold"
        }
    },
    title: {
        text: '',
        align: ''
    },
    xAxis: {
        categories: ['عدم خرید برق', 'خرید برق پایه', 'خرید برق پایه ای', 'تجربه خرید پیشین']
    },
    credits: {
        enabled: false
    },
    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'مبلغ پرداختی و میزان صرفه جویی'
        }
    },
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    tooltip: {
        useHTML: true,
        formatter : function(){
            return(
             `<b>${this.x}</b><br/>${this.series.name}: ${this.y.toLocaleString("en-US")}<br/>` +
            `Total: <span style="direction:ltr; display:inline-block;">${this.point.stackTotal.toLocaleString("en-US")}</span>`
)},
            style:{
                fontFamily:"yekanbakh-bold",
                direction:"ltr",
                textAlign:"left"
            }
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,       
                formatter: function () {
                    
                      return this.y.toLocaleString("en-US");
                    }
                
            }
        }
    },

    series: [{
        name: 'میزان صرفه جویی',
        data: [0, priceWOC5_opt5, price2_WOC , price3_WOC],
        color: '#2d3191'
    }, {
        name: 'مبلغ پرداختی',
        data: [priceWOC5, price1, price2 , price3],
        color:'red'
    }]
});

  }); 

  
  return (
    <div className="p-4">
      <figure className="highcharts-figure mx-auto" >
        <div id="container" style={{ height: '500px', width: '100%'  }}></div>
      </figure>
    </div>
  );
};

export default EnergyChart;
