import { el, setChildren } from 'redom';
import selectCloseArrow from '../assets/img/selectCloseArrow.svg';

export default function createSelect(optionsList, titleValue, id) {
  const select = el('div.select');
  select.id = id;
  const selectHeader = el('div.selectHeader');
  const selectValue = el('span.selectValue', titleValue);
  const selectIcon = el('img.selectIcon', { src: selectCloseArrow });
  const selectBody = el('div.selectBody');
  for (const option of optionsList) {
    const selectItem = el('div.selectItem', option);
    selectItem.addEventListener('click', function () {
      const value = this.textContent;
      selectValue.textContent = value;
      this.parentElement.parentElement.classList.toggle('selectOpen');
    });
    selectBody.append(selectItem);
  }
  // открытие и закрытие селекта
  selectHeader.addEventListener('click', function () {
    this.parentElement.classList.toggle('selectOpen');
  });
  setChildren(selectHeader, selectValue, selectIcon);
  setChildren(select, selectHeader, selectBody);
  return select;
}
