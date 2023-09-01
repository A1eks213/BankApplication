export function sortNumber(array) {
  return array.sort((a, b) => Number(a.account) - Number(b.account));
}
export function sortBalance(array) {
  return array.sort((a, b) => b.balance - a.balance);
}
export function sortTransactions(array) {
  return array.sort((a, b) => (
    b.transactions.length > 0 ? new Date(b.transactions[0].date) : 0)
      - (a.transactions.length > 0 ? new Date(a.transactions[0].date) : 0));
}
