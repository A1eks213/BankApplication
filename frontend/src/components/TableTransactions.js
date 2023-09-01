import { el, setChildren } from 'redom';

export default function tableTranactions(accountInfo, lengthOfTable) {
  const transactionsTableDiv = el('div.transactionsTableDiv');
  const transactionsTbody = el('tbody.transactionsTbody',
    el('tr.transactionsTitleTr',
      el('td.transactionsTitleTd', 'Счёт отправителя'),
      el('td.transactionsTitleTd', 'Счёт получателя'),
      el('td.transactionsTitleTd', 'Сумма'),
      el('td.transactionsTitleTd', 'Дата')));
  const transactionsLength = accountInfo.transactions.length;
  let lastTransactionNumber = transactionsLength - 1;
  if (accountInfo.transactions) {
    while (accountInfo.transactions[lastTransactionNumber]
      && lastTransactionNumber > transactionsLength - lengthOfTable) {
      const tr = el('tr.transactionsTr',
        el('td.transactionsTd', accountInfo.transactions[lastTransactionNumber].from),
        el('td.transactionsTd', accountInfo.transactions[lastTransactionNumber].to),
        accountInfo.transactions[lastTransactionNumber].to === accountInfo.account ? el('td.transactionsTd.transactionsTdPlus', `+ ${accountInfo.transactions[lastTransactionNumber].amount.toLocaleString('ru-RU')} ₽`) : el('td.transactionsTd.transactionsTdMinus', `- ${accountInfo.transactions[lastTransactionNumber].amount.toLocaleString('ru-RU')} ₽`),
        el('td.transactionsTd', new Date(accountInfo.transactions[lastTransactionNumber].date).toLocaleString('ru', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        })));
      transactionsTbody.append(tr);
      lastTransactionNumber--;
    }
  }
  const transactionsTableTitle = el('h2.transactionsTableTitle', 'История переводов');
  const transactionsTable = el('table.transactionTable',
    transactionsTbody);
  setChildren(transactionsTableDiv, transactionsTableTitle, transactionsTable);
  return transactionsTableDiv;
}
