
var time_win = document.getElementById("time_win");
var time_close = document.getElementById("time_close");
var calcular = document.getElementById("calcular");

calcular.addEventListener('click', gen_charts);

function gen_random_color(){
  return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}

function dateconv(unix){
  return new Date(unix).toLocaleDateString("en-US")
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
}	

function datetostring(date){
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if(month<10){ 
    if(day<10){return `${year}-0${month}-0${day}`;}
    else{return `${year}-0${month}-${day}`;}
  }
  else{
    if(day<10){return `${year}-${month}-0${day}`;}
    else{return `${year}-${month}-${day}`;}
  }
}



function gen_charts(){
  var time_win_v=time_win.options[time_win.selectedIndex].value;
  var edt=time_close.options[time_close.selectedIndex].value;
  var sdt=datetostring(addDays(new Date(edt),-time_win_v*30));
  

  function stock_prices(stock,start_date,end_date) {
    return fetch('https://api.polygon.io/v2/aggs/ticker/'+stock+'/range/1/day/'+start_date+'/'+end_date+'?adjusted=true&sort=asc&limit=120&apiKey=ANCs3O32toQeIRRgEa6K0mdesZ4sSg4y')
      .then(response => response.json())
  }


  let x_1; 
  let z_1=new Array();
  const storedPromise_1 = stock_prices('AAPL',sdt,edt);
  storedPromise_1.then((result)=>{
  
    x_1=result.results;
    console.log(x_1);
    for (i=0; i<x_1.length; i++){z_1.push([dateconv(x_1[i].t),x_1[i].c]);}
    col=gen_random_color();
    show_charts(z_1,'myChart1','AAPL',col);
    document.getElementById('card1').style.backgroundColor=col;
    document.getElementById('var_pct_1').innerHTML=parseFloat(100*(x_1[x_1.length-1].c/x_1[0].c-1)).toFixed(2);
  });
  
  let x_2; 
  let z_2=new Array();
  const storedPromise_2 = stock_prices('AMZN',sdt,edt);
  storedPromise_2.then((result)=>{
  
    x_2=result.results;
    for (i=0; i<x_2.length; i++){z_2.push([dateconv(x_2[i].t),x_2[i].c]);}
    col=gen_random_color();
    show_charts(z_2,'myChart2','AMZN',col);
    document.getElementById('card2').style.backgroundColor=col;
    document.getElementById('var_pct_2').innerHTML=parseFloat(100*(x_2[x_2.length-1].c/x_2[0].c-1)).toFixed(2);
  });
  
  let x_3; 
  let z_3=new Array();
  const storedPromise_3 = stock_prices('GOOG',sdt,edt);
  storedPromise_3.then((result)=>{
  
    x_3=result.results;
    for (i=0; i<x_3.length; i++){z_3.push([dateconv(x_3[i].t),x_3[i].c]);}
    col=gen_random_color();
    show_charts(z_3,'myChart3','GOOG',col);
    document.getElementById('card3').style.backgroundColor=col;
    document.getElementById('var_pct_3').innerHTML=parseFloat(100*(x_3[x_3.length-1].c/x_3[0].c-1)).toFixed(2);
  });
  
  let x_4; 
  let z_4=new Array();
  const storedPromise_4 = stock_prices('NFLX',sdt,edt);
  storedPromise_4.then((result)=>{
  
    x_4=result.results;
    for (i=0; i<x_4.length; i++){z_4.push([dateconv(x_4[i].t),x_4[i].c]);}
    col=gen_random_color();
    show_charts(z_4,'myChart4','NFLX',col);
    document.getElementById('card4').style.backgroundColor=col;
    document.getElementById('var_pct_4').innerHTML=parseFloat(100*(x_4[x_4.length-1].c/x_4[0].c-1)).toFixed(2);
  });
  
  function show_charts(z,div_id,stock_name,color){
  
    var ctx = document.getElementById(div_id);
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: z.map(function(value,index) { return value[0]; }),
        datasets: [{
          data: z.map(function(value,index) { return value[1]; }),
          lineTension: 0,
          label: stock_name,
          backgroundColor: 'transparent',
          borderColor: color,
          borderWidth: 4
         
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: true,
        }
      }
    });
    
  
  };

};




