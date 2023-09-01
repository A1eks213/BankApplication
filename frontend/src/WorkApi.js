export async function getLogin(loginInput, passwordInput) {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      login: loginInput,
      password: passwordInput,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return response;
}
export async function getAccountsList(token) {
  const response = await fetch('http://localhost:3000/accounts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json()).then((res) => res.payload);
  return response;
}
export async function getAccountInfo(id, token) {
  const response = await fetch(`http://localhost:3000/account/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json()).then((res) => res.payload);
  return response;
}
export const getTokenInLocal = (token) => {
  sessionStorage.setItem('token', JSON.stringify(token));
};
export const getToken = () => JSON.parse(sessionStorage.getItem('token'));
export const getRecipientsInLocal = (recipients) => {
  const getOfLocal = localStorage.getItem('recipients');
  let recipientsArray = [];
  if (!getOfLocal || JSON.parse(getOfLocal).length === 0) {
    recipientsArray.push(recipients);
  } else {
    recipientsArray = JSON.parse(getOfLocal);
    if (!recipientsArray.includes(recipients)) {
      recipientsArray.push(recipients);
    }
  }
  localStorage.setItem('recipients', JSON.stringify(recipientsArray));
};
export const recipientsArray = () => JSON.parse(localStorage.getItem('recipients'));
export async function createAccount(token) {
  const response = await fetch('http://localhost:3000/create-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json());
  return response;
}
export async function getATMsList() {
  const response = await fetch('http://localhost:3000/banks').then((res) => res.json()).then((res) => Object.values(res.payload));
  return response;
}
export async function transferFunds(from, to, amount, token) {
  const response = await fetch('http://localhost:3000/transfer-funds', {
    method: 'POST',
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json());
  return response;
}
export async function getCurrenciesAccounts(token) {
  const response = await fetch('http://localhost:3000/currencies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json()).then((res) => res.payload);
  return response;
}
export async function getKnownCurrencies() {
  const response = await fetch('http://localhost:3000/all-currencies').then((res) => res.json()).then((res) => res.payload);
  return response;
}
export async function exchangeCurrency(from, to, amount, token) {
  const response = await fetch('http://localhost:3000/currency-buy', {
    method: 'POST',
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json());
  return response;
}
export async function getChangedCurrency() {
  return new WebSocket('ws://localhost:3000/currency-feed');
}
