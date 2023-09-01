import Chart from 'chart.js/auto';

export default function transactionsRatio(accountInfo) {
  const thisDate = new Date();
  const thisMonth = thisDate.toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const eleventhTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const tenthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const ninthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const eighthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const seventhTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const sixthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const fifthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const fourthTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const thirdTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const secondTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  const firstTableMonth = new Date(thisDate.setMonth(thisDate.getMonth() - 1)).toLocaleString('ru', { month: 'long' }).substr(0, 3);
  let plusTwelfthMonth = 0;
  let plusEleventhMonth = 0;
  let plusTenthMonth = 0;
  let plusNinthMonth = 0;
  let plusEighthMonth = 0;
  let plusSeventhMonth = 0;
  let plusSixthMonth = 0;
  let plusFifthMonth = 0;
  let plusFourthMonth = 0;
  let plusThirdMonth = 0;
  let plusSecondMonth = 0;
  let plusFirstMonth = 0;
  let minusTwelfthMonth = 0;
  let minusEleventhMonth = 0;
  let minusTenthMonth = 0;
  let minusNinthMonth = 0;
  let minusEighthMonth = 0;
  let minusSeventhMonth = 0;
  let minusSixthMonth = 0;
  let minusFifthMonth = 0;
  let minusFourthMonth = 0;
  let minusThirdMonth = 0;
  let minusSecondMonth = 0;
  let minusFirstMonth = 0;
  // // подсчёт баланса по месяцам
  const today = new Date();
  const referenceDayEleventhMonth = new Date().setDate(1);
  // console.log(referenceDayEleventhMonth);
  const referenceDayTenthMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayNinthMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayEighthMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDaySeventhMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDaySixthMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayFifthMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayFourthMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayThirdMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDaySecondMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayFirstMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  const referenceDayPrefirstMonth = new Date(today.setMonth(today.getMonth() - 1)).setDate(1);
  accountInfo.transactions.forEach((elem) => {
    if (referenceDayEleventhMonth < new Date(elem.date).getTime()) {
      if (elem.to === accountInfo.account) { plusTwelfthMonth += elem.amount; } else {
        minusTwelfthMonth += elem.amount;
      }
    }
    if (referenceDayTenthMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayEleventhMonth) {
      if (elem.to === accountInfo.account) { plusEleventhMonth += elem.amount; } else {
        minusEleventhMonth += elem.amount;
      }
    }
    // десятый месяц графика
    if (referenceDayNinthMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayTenthMonth) {
      if (elem.to === accountInfo.account) { plusTenthMonth += elem.amount; } else {
        minusTenthMonth += elem.amount;
      }
    }
    // девятый месяц графика
    if (referenceDayEighthMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayNinthMonth) {
      if (elem.to === accountInfo.account) { plusNinthMonth += elem.amount; } else {
        minusNinthMonth += elem.amount;
      }
    }
    // восьмой месяц графика
    if (referenceDaySeventhMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayEighthMonth) {
      if (elem.to === accountInfo.account) { plusEighthMonth += elem.amount; } else {
        minusEighthMonth += elem.amount;
      }
    }
    // седьмой месяц графика
    if (referenceDaySixthMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDaySeventhMonth) {
      if (elem.to === accountInfo.account) { plusSeventhMonth += elem.amount; } else {
        minusSeventhMonth += elem.amount;
      }
    }
    // шестой месяц графика
    if (referenceDayFifthMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDaySixthMonth) {
      if (elem.to === accountInfo.account) { plusSixthMonth += elem.amount; } else {
        minusSixthMonth += elem.amount;
      }
    }
    // пятый месяц графика
    if (referenceDayFourthMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayFifthMonth) {
      if (elem.to === accountInfo.account) { plusFifthMonth += elem.amount; } else {
        minusFifthMonth += elem.amount;
      }
    }
    // четвёртый месяц графика
    if (referenceDayThirdMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayFourthMonth) {
      if (elem.to === accountInfo.account) { plusFourthMonth += elem.amount; } else {
        minusFourthMonth += elem.amount;
      }
    }
    // третий месяц графика
    if (referenceDaySecondMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayThirdMonth) {
      if (elem.to === accountInfo.account) { plusThirdMonth += elem.amount; } else {
        minusThirdMonth += elem.amount;
      }
    }
    // второй месяц графика
    if (referenceDayFirstMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDaySecondMonth) {
      if (elem.to === accountInfo.account) { plusSecondMonth += elem.amount; } else {
        minusSecondMonth += elem.amount;
      }
    }
    // первый месяц графика
    if (referenceDayPrefirstMonth < new Date(elem.date).getTime()
    && new Date(elem.date).getTime() < referenceDayFirstMonth) {
      if (elem.to === accountInfo.account) { plusFirstMonth += elem.amount; } else {
        minusFirstMonth += elem.amount;
      }
    }
  });
  const maxDifference = Math.round(Math.max(
    Math.abs(plusFirstMonth - minusFirstMonth),
    Math.abs(plusSecondMonth - minusSecondMonth),
    Math.abs(plusThirdMonth - minusThirdMonth),
    Math.abs(plusFourthMonth - minusFourthMonth),
    Math.abs(plusFifthMonth - minusFifthMonth),
    Math.abs(plusSixthMonth - minusSixthMonth),
    Math.abs(plusSeventhMonth - minusSeventhMonth),
    Math.abs(plusEighthMonth - minusEighthMonth),
    Math.abs(plusNinthMonth - minusNinthMonth),
    Math.abs(plusTenthMonth - minusTenthMonth),
    Math.abs(plusEleventhMonth - minusEleventhMonth),
    Math.abs(plusTwelfthMonth - minusTwelfthMonth),
  ));
  Chart.defaults.font.size = 20;
  Chart.defaults.font.weight = 700;
  Chart.defaults.color = 'black';
  const tranactionsRatioChart = document.getElementById('transactionsRatioChart').getContext('2d');
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
  const ChartTransactions = new Chart(tranactionsRatioChart, {
    type: 'bar',
    data: {
      labels: [
        firstTableMonth,
        secondTableMonth,
        thirdTableMonth,
        fourthTableMonth,
        fifthTableMonth,
        sixthTableMonth,
        seventhTableMonth,
        eighthTableMonth,
        ninthTableMonth,
        tenthTableMonth,
        eleventhTableMonth,
        thisMonth,
      ],
      datasets: [{
        // yAxisID: 'yAxes',
        // xAxisID: 'xAxes',
        data: [
          plusFirstMonth,
          plusSecondMonth,
          plusThirdMonth,
          plusFourthMonth,
          plusFifthMonth,
          plusSixthMonth,
          plusSeventhMonth,
          plusEighthMonth,
          plusNinthMonth,
          plusTenthMonth,
          plusEleventhMonth,
          plusTwelfthMonth,
        ],
        backgroundColor: '#76CA66',
        borderWidth: 1,
      },
      {
        // yAxisID: 'yAxes',
        // xAxisID: 'xAxes',
        data: [
          minusFirstMonth,
          minusSecondMonth,
          minusThirdMonth,
          minusFourthMonth,
          minusFifthMonth,
          minusSixthMonth,
          minusSeventhMonth,
          minusEighthMonth,
          minusNinthMonth,
          minusTenthMonth,
          minusEleventhMonth,
          minusTwelfthMonth,
        ],
        backgroundColor: '#FD4E5D',
        borderWidth: 1,
      },
      ],
    },
    options: {
      scales: {
        y: {
          stacked: true,
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
          stacked: true,
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
  return {
    ChartTransactions,
    maxDifference,
  };
}
