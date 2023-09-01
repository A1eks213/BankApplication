import Chart from 'chart.js/auto';

export default function balanceDynamicSmall(accountInfo) {
  const thisDate = new Date();
  const thisMonth = thisDate.toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const fifthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const fourthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const thirdTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const secondTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const firstTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  let balanceFifthMonth = 0;
  let balanceFourthMonth = 0;
  let balanceThirdMonth = 0;
  let balanceSecondMonth = 0;
  let balanceFirstMonth = 0;
  // подсчёт баланса по месяцам
  const today = new Date();
  const referenceDayFourthMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayThirdMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDaySecondMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayFirstMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  accountInfo.transactions.forEach((elem) => {
    // пятый месяц графика
    if (new Date(elem.date).getTime() < new Date().setDate(1)) {
      if (elem.to === accountInfo.account) {
        balanceFifthMonth += elem.amount;
      } else {
        balanceFifthMonth -= elem.amount;
      }
    }
    // четвёртый месяц графика
    if (new Date(elem.date).getTime() < referenceDayFourthMonth) {
      if (elem.to === accountInfo.account) {
        balanceFourthMonth += elem.amount;
      } else {
        balanceFourthMonth -= elem.amount;
      }
    }
    // третий месяц графика
    if (new Date(elem.date).getTime() < referenceDayThirdMonth) {
      if (elem.to === accountInfo.account) {
        balanceThirdMonth += elem.amount;
      } else {
        balanceThirdMonth -= elem.amount;
      }
    }
    // второй месяц графика
    if (new Date(elem.date).getTime() < referenceDaySecondMonth) {
      if (elem.to === accountInfo.account) {
        balanceSecondMonth += elem.amount;
      } else {
        balanceSecondMonth -= elem.amount;
      }
    }
    // первый месяц графика
    if (new Date(elem.date).getTime() < referenceDayFirstMonth) {
      if (elem.to === accountInfo.account) {
        balanceFirstMonth += elem.amount;
      } else {
        balanceFirstMonth -= elem.amount;
      }
    }
  });
  Chart.defaults.font.size = 20;
  Chart.defaults.font.weight = 700;
  Chart.defaults.color = 'black';
  const balanceDynamicChart = document.getElementById('balanceDynamicChart').getContext('2d');
  const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
      const {
        ctx, chartArea: {
          left, top, width, height,
        },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };
  return new Chart(balanceDynamicChart, {
    type: 'bar',
    data: {
      labels: [
        firstTableMonth,
        secondTableMonth,
        thirdTableMonth,
        fourthTableMonth,
        fifthTableMonth,
        thisMonth,
      ],
      datasets: [{
        // yAxisID: 'yAxes',
        // xAxisID: 'xAxes',
        data: [
          balanceFirstMonth,
          balanceSecondMonth,
          balanceThirdMonth,
          balanceFourthMonth,
          balanceFifthMonth,
          accountInfo.balance,
        ],
        backgroundColor: '#116ACC',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          position: 'right',
          grid: {
            display: false,
            drawTicks: false,
          },
          ticks: {
            callback: (value, index, values) => (index > 0 && index < values.length - 1
              ? ''
              : Math[index ? 'max' : 'min'](...values.map((n) => n.value))),
          },

        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        chartAreaBorder: {
          borderColor: 'black',
          borderWidth: 2,
          borderDashOffset: 2,
        },
      },
    },
    plugins: [chartAreaBorder],
  });
}
