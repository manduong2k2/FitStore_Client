topSales();
monthIncome((new Date()).getMonth() + 1);
function monthIncome(month) {
    axios.get("http://jul2nd.ddns.net/statistic/income/" + month).then((response) => {
        fetch('/page/statistic/income.ejs')
            .then((response) => response.text())
            .then((data) => {
                const renderedHtml = ejs.render(data, { data: response.data });
                var chart = document.createElement('div');
                chart.id='month_income';
                chart.style.display = "flex";
                chart.style.justifyContent = "center";
                chart.innerHTML = renderedHtml;
                root.appendChild(chart);
                checkMonthNumber();
            })
            .catch((error) => console.error("Error fetching EJS file:", error));
    });
}
function topSales(){
    axios.get("http://jul2nd.ddns.net/statistic/topSales").then((response) => {
    fetch('/page/statistic/top.sale.ejs')
      .then((response) => response.text())
      .then((data) => {
        const renderedHtml = ejs.render(data,{data:response.data});
        var chart = document.createElement('div');
        chart.innerHTML = renderedHtml;
        root.appendChild(chart);
        document.getElementById("titlePage").innerHTML = "Thống kê";
      })
      .catch((error) => console.error("Error fetching EJS file:", error));
  });
}
async function updateMonthIncome(month) {
    axios.get("http://jul2nd.ddns.net/statistic/income/" + month).then((response) => {
        fetch('/page/statistic/income.ejs')
            .then((response) => response.text())
            .then((data) => {
                const renderedHtml = ejs.render(data, { data: response.data });
                var chart = document.getElementById('month_income');
                chart.innerHTML = renderedHtml;
                document.getElementById('month').value=parseInt(month);
                checkMonthNumber();
            })
            .catch((error) => console.error("Error fetching EJS file:", error));
    });
}
function increase(){
    var month = document.getElementById('month');
    month.value++;
    updateMonthIncome(month.value);
}
function decrease(){
    var month = document.getElementById('month');
    month.value--;
    updateMonthIncome(month.value);
}
function checkMonthNumber() {
    var number = document.getElementById('month').value;
    var buttonPlus = document.getElementById('btnIncrease');
    var buttonMinus = document.getElementById('btnDecrease');
    if (number === "12") buttonPlus.classList.add("disable-btn");
    else buttonPlus.classList.remove("disable-btn");
    if (number === "1") buttonMinus.classList.add("disable-btn");
    else buttonMinus.classList.remove("disable-btn");
}
