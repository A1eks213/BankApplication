import { el, setChildren } from 'redom';
import Navigo from 'navigo';
import './style.css';
import './stylesSelect.css';
import './styleAutocomplete.css';
import ymaps from 'ymaps';
import leftArrowSrc from './assets/img/leftArrow.svg';
import letterSrc from './assets/img/letter.svg';
import logoSrc from './assets/img/Logo.svg';
import plusSrc from './assets/img/plus.svg';
import currencyRateUp from './assets/img/currencyRateUp.svg';
import currencyRateDown from './assets/img/currencyRateDown.svg';
import {
  getLogin,
  getAccountsList,
  getAccountInfo,
  getTokenInLocal,
  getToken,
  createAccount,
  transferFunds,
  getATMsList,
  getRecipientsInLocal,
  recipientsArray,
  getCurrenciesAccounts,
  getKnownCurrencies,
  exchangeCurrency,
} from './WorkApi';
import { sortNumber, sortBalance, sortTransactions } from './components/sort';
import tableTranactions from './components/TableTransactions';
import balanceDynamicSmall from './components/BalanceDynamicSmall';
import balanceDynamicBig from './components/BalanceDynamicBig';
import transactionsRatio from './components/TransactionsRatio';
import createSelect from './components/selectCustom';
import autocompleter from './components/autocompleter';

const router = new Navigo('/');
const tokenVerification = getToken();
if (!tokenVerification) {
  router.navigate('/login');
}
// прелоадер
function preloaderGo() {
  const preloader = el('div.preloader',
    el('div.preloader__row',
      el('div.preloader__item'),
      el('div.preloader__item')));
  document.body.append(preloader);
}
// создание header
function getHeader() {
  const header = el('header.header');
  const logo = el('img.logo', { src: logoSrc });
  const navigateBtnsDiv = el('div#navigateBtnsDiv');
  const btnATM = el('button.btnATM#btnATM', 'Банкоматы');
  const btnAccounts = el('button.btnAccounts#btnAccounts', 'Счета');
  const btnCurrency = el('button.btnCurrency#btnCurrency', 'Валюта');
  const btnExit = el('button.btnExit', 'Выйти');

  btnATM.addEventListener('click', () => {
    router.navigate('/ATMs');
  });
  btnAccounts.addEventListener('click', () => {
    router.navigate('/accounts');
  });
  btnCurrency.addEventListener('click', () => {
    router.navigate('/currency');
  });
  btnExit.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    router.navigate('/login');
  });
  setChildren(navigateBtnsDiv, btnATM, btnAccounts, btnCurrency, btnExit);
  setChildren(header, logo, navigateBtnsDiv);
  return header;
}
// страница входа
function getStartPage() {
  const formAuth = el('form.formAuth');
  const mainAuth = el('main.mainAuth');
  // форма авторизации
  const formAuthTitle = el('h2.formAuthTitle', 'Вход в аккаунт');
  const inputLogin = el('input.inputLogin', { placeholder: 'Placeholder' });
  const inputLoginSpan = el('span.inputLoginSpan', 'Логин');
  const inputLoginDiv = el('div.inputLoginDiv', inputLoginSpan, inputLogin);
  const inputPassword = el('input.inputPassword', { placeholder: 'Placeholder', type: 'password' });
  const inputPasswordSpan = el('span.inputPasswordSpan', 'Пароль');
  const inputPasswordDiv = el('div.inputPasswordDiv', inputPasswordSpan, inputPassword);
  const buttonAuth = el('button.buttonAuth', 'Войти');
  const validationAuth = el('span.validationAuth');
  const reg = / /g;
  inputLogin.addEventListener('input', () => {
    validationAuth.style.display = 'none';
    inputLogin.value = inputLogin.value.replace(reg, '');
  });
  inputPassword.addEventListener('input', () => {
    validationAuth.style.display = 'none';
    inputPassword.value = inputPassword.value.replace(reg, '');
  });
  setChildren(formAuth,
    formAuthTitle, inputLoginDiv, inputPasswordDiv, buttonAuth, validationAuth);
  setChildren(mainAuth, formAuth);
  setChildren(document.body, getHeader(), mainAuth);
  buttonAuth.addEventListener('click', async (e) => {
    e.preventDefault();
    const token = await getLogin(inputLogin.value, inputPassword.value);
    if (token.payload !== null) {
      getTokenInLocal(Object.values(token.payload)[0]);
      inputLogin.value = '';
      inputPassword.value = '';
      router.navigate('/accounts');
    } else {
      validationAuth.style.display = 'block';
      validationAuth.textContent = token.error;
    }
  });
}

// Страница истории баланса
async function getHistoryOfBalancePage(id, token) {
  document.body.innerHTML = '';
  preloaderGo();
  const accountInfo = await getAccountInfo(id, token);
  const mainHistoryOfBalance = el('main.main');
  const goBackBtn = el('button.goBackButton',
    el('img.leftArrow', { src: leftArrowSrc }),
    'Вернуться назад');
  const navigationAccountInfoDiv = el('div.navigationAccountInfoDiv',
    el('h1.accountsTitle.mainTitle', 'История Баланса'),
    // sortAccountSelect,
    goBackBtn);
  goBackBtn.addEventListener('click', () => {
    router.navigate(`/accountInfo/${accountInfo.account}`);
  });
  const numberAndBalanceDiv = el('div.numberAndBalanceDiv',
    el('span.numberInfoSpan', `№ ${accountInfo.account}`),
    el('sapn.balanceInfoDiv',
      el('span.balanceTextSpan', 'Баланс'),
      el('span.balanceValueSpan', `${accountInfo.balance} ₽`)));
  const mainInfoDiv = el('div.mainInfoDiv');
  const balanceDynamicsBigDiv = el('div.balanceDynamicsBigDiv',
    el('h2.balanceDynamicTitle', 'Динамика баланса'),
    el('canvas.balanceDynamicChart#balanceDynamicChartBig'));
  const transactionsRatioDiv = el('div.transactionsRatioDiv',
    el('h2.transactionsRatioTitle', 'Соотношение входящих исходящих транзакций'),
    el('canvas.transactionsRatioChart#transactionsRatioChart'));
  const transactionsTableDiv = tableTranactions(accountInfo, 26);
  setChildren(mainInfoDiv,
    balanceDynamicsBigDiv, transactionsRatioDiv, transactionsTableDiv);
  setChildren(mainHistoryOfBalance, navigationAccountInfoDiv, numberAndBalanceDiv, mainInfoDiv);
  setChildren(document.body, getHeader(), mainHistoryOfBalance);
  // диаграмма
  balanceDynamicBig(accountInfo);
  transactionsRatio(accountInfo);
}

// Подробная страница счёта
async function getAccountInfoPage(id, token) {
  document.body.innerHTML = '';
  preloaderGo();
  const accountInfo = await getAccountInfo(id, token);
  const mainAccountInfo = el('main.mainAccountInfo.main');
  const goBackBtn = el('button.goBackButton',
    el('img.leftArrow', { src: leftArrowSrc }),
    'Вернуться назад');
  const navigationAccountInfoDiv = el('div.navigationAccountInfoDiv',
    el('h1.accountsTitle.mainTitle', 'Просмотр счёта'),
    // sortAccountSelect,
    goBackBtn);
  goBackBtn.addEventListener('click', () => { router.navigate('/accounts'); });
  const numberAndBalanceDiv = el('div.numberAndBalanceDiv',
    el('span.numberInfoSpan', `№ ${accountInfo.account}`),
    el('sapn.balanceInfoDiv',
      el('span.balanceTextSpan', 'Баланс'),
      el('span.balanceValueSpan', `${accountInfo.balance} ₽`)));
  const mainInfoDiv = el('div.mainInfoDiv');
  // форма перевода
  const formTransaction = el('form.formTransaction');
  const formTransactionTitle = el('h2.formTransactionTitle', 'Новый перевод');
  const inputPayRecipient = el('input.inputPayRecipient#inputPayRecipient', { placeholder: 'Placeholder' });
  inputPayRecipient.autocomplete = 'off';
  inputPayRecipient.type = 'number';
  const autocompleterArray = recipientsArray();
  const inputPayRecipientSpan = el('span.inputLoginSpan', 'Номер счёта получателя');
  const inputPayRecipientDiv = el('div.inputPayRecipientDiv', inputPayRecipientSpan, inputPayRecipient);
  const inputAmount = el('input.inputAmount', { placeholder: 'Placeholder' });
  inputAmount.type = 'number';
  const inputAmountSpan = el('span.inputAmountSpan', 'Сумма перевода');
  const inputAmountDiv = el('div.inputAmountDiv', inputAmountSpan, inputAmount);
  const buttonTransaction = el('button.buttonTransaction',
    el('img.letter', { src: letterSrc }),
    'Отправить');
  const validationTransaction = el('span.validationTransaction');
  const reg = / /g;
  inputPayRecipient.addEventListener('input', () => {
    inputPayRecipient.value = inputPayRecipient.value.replace(reg, '');
    validationTransaction.style.display = 'none';
  });
  inputAmount.addEventListener('input', () => {
    inputAmount.value = inputAmount.value.replace(reg, '');
    validationTransaction.style.display = 'none';
  });
  setChildren(formTransaction, formTransactionTitle,
    inputPayRecipientDiv, inputAmountDiv, buttonTransaction, validationTransaction);
  const chart = el('canvas.balanceDynamicChart#balanceDynamicChart');
  const balanceDynamicsSmallDiv = el('div.balanceDynamicsSmallDiv',
    el('h2.balanceDynamicTitle', 'Динамика баланса'),
    chart);
  balanceDynamicsSmallDiv.addEventListener('click', () => {
    router.navigate(`/histiryOfBalance/${accountInfo.account}`);
  });
  // таблица транзакций
  const transactionsTableDiv = tableTranactions(accountInfo, 11);
  transactionsTableDiv.addEventListener('click', () => {
    router.navigate(`/histiryOfBalance/${accountInfo.account}`);
  });
  setChildren(mainInfoDiv, formTransaction, balanceDynamicsSmallDiv, transactionsTableDiv);
  setChildren(mainAccountInfo, navigationAccountInfoDiv, numberAndBalanceDiv, mainInfoDiv);
  setChildren(document.body, getHeader(), mainAccountInfo);
  // диаграмма
  balanceDynamicSmall(accountInfo);
  // кнопки, после которых происходит обновление страницы c новыми данными
  buttonTransaction.addEventListener('click', async (e) => {
    e.preventDefault();
    const transaction = await transferFunds(accountInfo.account,
      inputPayRecipient.value, inputAmount.value, getToken());
    if (transaction.payload !== null) {
      getRecipientsInLocal(inputPayRecipient.value);
      inputPayRecipient.value = '';
      inputAmount.value = '';
      getAccountInfoPage(id, token);
    } else {
      validationTransaction.style.display = 'block';
      validationTransaction.textContent = transaction.error;
    }
  });
  autocompleter('inputPayRecipient', autocompleterArray);
}

// создание списка счетов
function createAccountsDiv(accountsList) {
  const accountsDiv = el('div.accountsDiv#accountsDiv');
  for (const account of accountsList) {
    const accountDiv = el('div.accountDiv');
    const accountNumber = el('span.accountNumber', account.account);
    const accountBalance = el('span.accountBalance', `${account.balance.toLocaleString('ru-RU')} ₽`);
    const lastTransactionDiv = el('div.lastTransactionDiv',
      el('span.lastTransactionTitle', 'Последняя транзакция:'),
      el('span.lastTransactionDate',
        account.transactions.length > 0 ? new Date(account.transactions[0].date).toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }) : 'Транзакции не проводились'));
    const accountBtnMore = el('button.accountBtnMore', 'Открыть');
    accountBtnMore.setAttribute('data-number', account.account);
    accountBtnMore.addEventListener('click', function () {
      router.navigate(`/accountInfo/${this.dataset.number}`);
    });
    setChildren(accountDiv, accountNumber, accountBalance, lastTransactionDiv, accountBtnMore);
    accountsDiv.append(accountDiv);
  }
  return accountsDiv;
}

// страница счетов
async function getAccountsPage() {
  document.body.innerHTML = '';
  preloaderGo();
  const mainAccounts = el('main.mainAccounts.main');
  const createNewAccountBtn = el('button.createNewAccountBtn',
    el('img.plus', { src: plusSrc }),
    'Создать новый счёт');
  const sortBtnsName = [
    'По номеру',
    'По балансу',
    'По последней транзакции',
  ];
  const sortSelect = createSelect(sortBtnsName, 'Сортировка', 'sortSelect');
  const navigationAccountsDiv = el('div.navigationAccountsDiv',
    el('h1.accountsTitle.mainTitle', 'Ваши счета'),
    sortSelect,
    createNewAccountBtn);
  const accountsDiv = createAccountsDiv(await getAccountsList(getToken()));
  setChildren(mainAccounts, navigationAccountsDiv, accountsDiv);
  setChildren(document.body, getHeader(), mainAccounts);
  createNewAccountBtn.addEventListener('click', async () => {
    createAccount(getToken());
    const updatedAccountsDiv = createAccountsDiv(await getAccountsList(getToken()));
    mainAccounts.replaceChild(updatedAccountsDiv, accountsDiv);
  });
  async function sortAccountsDiv(sortFunction) {
    const sortedAccountsList = sortFunction(await getAccountsList(getToken()));
    const sortedAccountsDiv = await createAccountsDiv(sortedAccountsList);
    setChildren(mainAccounts, navigationAccountsDiv, sortedAccountsDiv);
  }
  const btnSortNumber = sortSelect.children[1].children[0];
  const btnSortBalance = sortSelect.children[1].children[1];
  const btnSortTransactions = sortSelect.children[1].children[2];
  btnSortNumber.addEventListener('click', async () => { sortAccountsDiv(sortNumber); });
  btnSortBalance.addEventListener('click', async () => { sortAccountsDiv(sortBalance); });
  btnSortTransactions.addEventListener('click', async () => { sortAccountsDiv(sortTransactions); });
  document.getElementById('btnAccounts').classList.add('disabled');
}
// Страница банкоматов
async function getATMsPage() {
  document.body.innerHTML = '';
  preloaderGo();
  const ATMsList = await getATMsList();
  const mainATMs = el('main.mainATMs.main');
  const ATMsTitle = el('h1.ATMsTitle', 'Карта банкоматов');
  const ATMsMapDiv = el('div.ATMsMapDiv#ATMsMapDiv', { style: 'width: 1340px; height: 728px' });
  ymaps
    .load('https://api-maps.yandex.ru/2.1/?apikey=вашAPI-ключ&lang=ru_RU')
    .then((maps) => {
      const map = new maps.Map('ATMsMapDiv', {
        center: [55.755246, 37.617779],
        zoom: 10,
        controls: {
          noSuggestPanel: false,
          routeEditor: false,
          routeButtonControl: false,
          routePanelControl: false,
        },
      });
      for (const atm of ATMsList) {
        const myGeoObject = new maps.GeoObject({
          geometry: {
            coordinates: [atm.lat, atm.lon],
            type: 'Point',
          },
        });
        map.geoObjects.add(myGeoObject);
      }
    });
  setChildren(mainATMs, ATMsTitle, ATMsMapDiv);
  setChildren(document.body, getHeader(), mainATMs);
  document.getElementById('btnATM').classList.add('disabled');
}

function createYourCurrencyList(list) {
  const yourCurrencyList = el('div.yourCurrencyList#yourCurrencyList');
  for (const key in list) {
    if (list[key].amount !== 0) {
      const currencyItem = el('div.currencyItem',
        el('span.nameOfCurrency', list[key].code),
        el('span.ellipsis'),
        el('span.valueOfCurrency', list[key].amount));
      yourCurrencyList.append(currencyItem);
    }
  }
  return yourCurrencyList;
}
async function getCurrencyPage() {
  document.body.innerHTML = '';
  preloaderGo();
  const currenciesAccountsList = await getCurrenciesAccounts(getToken());
  const mainCurrency = el('main.mainCurrency.main');
  const currencyMainDiv = el('div.currencyMainDiv');
  const currencyTitle = el('h1.currencyTitle', 'Валютный обмен');
  const currencyLeftDiv = el('div.currencyLeftDiv');
  const yourCurrenciesDiv = el('div.yourCurrenciesDiv',
    el('h2.yourCurrenciesTitle', 'Ваши Валюты'),
    createYourCurrencyList(currenciesAccountsList));
  // Форма обмена валюты
  const changeCurrencyForm = el('form.changeCurrencyForm');
  const changeCurrencyFormTitle = el('h2.changeCurrencyFormTitle', 'Обмен валюты');
  const changeCurrencyFormDiv = el('div.changeCurrencyFormDiv');
  const changeCurrencyFormInputsDiv = el('div.changeCurrencyFormInputsDiv');
  const changeCurrencyFormValidation = el('span.changeCurrencyFormValidation');
  const fromToSelectsDiv = el('div.fromToSelectsDiv',
    el('span.fromToSpan', 'Из'),
    createSelect(Object.keys(currenciesAccountsList), 'BTC', 'currencyFrom'),
    el('span.fromToSpan', 'в'),
    createSelect(await getKnownCurrencies(), 'ETH', 'currencyTo'));
  const currencyValueInput = el('input.currencyValueInput');
  currencyValueInput.addEventListener('input', () => {
    changeCurrencyFormValidation.style.display = 'none';
  });
  currencyValueInput.type = 'number';
  const currencyValueInputDiv = el('div.currencyValueInputDiv',
    el('span.currencyValueSpan', 'Сумма'),
    currencyValueInput);
  const changeCurrencyBtn = el('button.changeCurrencyBtn', 'Обменять');
  currencyValueInput.addEventListener('input', () => {
    changeCurrencyFormValidation.style.display = 'none';
  });
  changeCurrencyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const from = document.getElementById('currencyFrom').children[0].textContent;
    const to = document.getElementById('currencyTo').children[0].textContent;
    const exchanged = await exchangeCurrency(from, to, currencyValueInput.value, getToken());
    if (exchanged.payload !== null) {
      currencyValueInput.value = '';
      const yourCurrencyListOld = document.getElementById('yourCurrencyList');
      yourCurrenciesDiv.replaceChild(createYourCurrencyList(
        await getCurrenciesAccounts(getToken()),
      ),
      yourCurrencyListOld);
    } else {
      changeCurrencyFormValidation.style.display = 'block';
      changeCurrencyFormValidation.textContent = exchanged.error;
    }
  });
  setChildren(changeCurrencyFormInputsDiv, fromToSelectsDiv, currencyValueInputDiv);
  setChildren(changeCurrencyFormDiv, changeCurrencyFormInputsDiv, changeCurrencyBtn);
  setChildren(changeCurrencyForm,
    changeCurrencyFormTitle, changeCurrencyFormDiv, changeCurrencyFormValidation);

  const socket = new WebSocket('ws://localhost:3000/currency-feed');
  const currencyChangeOfCousesList = el('div.currencyChangeOfCousesList');
  const currencyChangeOfCoursesDiv = el('div.currencyChangeOfCoursesDiv',
    el('h2.currencyChangeOfCoursesDivTitle', 'Изменение курсов в реальном времени'),
    currencyChangeOfCousesList);
  socket.onmessage = (event) => {
    const currencyPair = JSON.parse(event.data);
    let currencyChangeImg;
    const currencyPairNameText = `${currencyPair.from}/${currencyPair.to}`;
    const currencyPairNameTextReverse = `${currencyPair.to}/${currencyPair.from}`;
    const currencyPairName = el('span.currencyPairName', currencyPairNameText);
    const ellipsis = el('span.ellipsis');
    if (currencyPair.change === 1) {
      currencyChangeImg = currencyRateUp;
      ellipsis.classList.add('ellipsisGreen');
    } else if (currencyPair.change === -1) {
      currencyChangeImg = currencyRateDown;
      ellipsis.classList.add('ellipsisRed');
    }
    const courseOfCurrencyPairDiv = el('dev.courseOfCurrencyPairDiv',
      currencyPairName,
      ellipsis,
      el('span.currencyPairRate', currencyPair.rate),
      el('img', { src: currencyChangeImg }), { id: currencyPairNameText });
    if (document.getElementById(currencyPairNameText)
              || document.getElementById(currencyPairNameTextReverse)) {
      const replacedChild = (document.getElementById(currencyPairNameText)
                || document.getElementById(currencyPairNameTextReverse));
      currencyChangeOfCousesList.replaceChild(courseOfCurrencyPairDiv,
        replacedChild);
    } else if (document.getElementsByClassName('courseOfCurrencyPairDiv').length < 14) {
      currencyChangeOfCousesList.append(courseOfCurrencyPairDiv);
    } else {
      const ff = document.getElementsByClassName('courseOfCurrencyPairDiv')[0];
      ff.remove();
      currencyChangeOfCousesList.append(courseOfCurrencyPairDiv);
    }
  };
  setChildren(currencyLeftDiv, yourCurrenciesDiv, changeCurrencyForm);
  setChildren(currencyMainDiv, currencyLeftDiv, currencyChangeOfCoursesDiv);
  setChildren(mainCurrency, currencyTitle, currencyMainDiv);
  setChildren(document.body, getHeader(), mainCurrency);
  document.getElementById('btnCurrency').classList.add('disabled');
}
//
router.on('/login', () => {
  getStartPage();
  document.getElementById('navigateBtnsDiv').style.display = 'none';
});
router.on('/accounts', async () => {
  getAccountsPage();
});
router.on('/currency', async () => {
  getCurrencyPage();
});
router.on('/ATMs', async () => {
  getATMsPage();
});
router.on('/accountInfo/:id', ({ data: { id } }) => {
  getAccountInfoPage(id, getToken());
});
router.on('/histiryOfBalance/:id', ({ data: { id } }) => {
  getHistoryOfBalancePage(id, getToken());
});
router.resolve();
