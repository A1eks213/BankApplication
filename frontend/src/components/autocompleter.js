import { el, setChildren } from 'redom';

export default function autocompleter(selector, array) {
  const input = document.getElementById(selector);
  input.classList.add('autocompleteInput');
  const wrap = el('div.autocompleteWrap');
  input.after(wrap);
  const list = el('div.autocompleteList');
  setChildren(wrap, list);
  input.addEventListener('input', function () {
    wrap.classList.add('autocompleteWrapOpen');
    list.innerHTML = '';
    const { value } = this;
    if (value.length !== 0) {
      wrap.classList.add('autocompleteWrapOpen');
      for (const item of array) {
        if (item.includes(value)) {
          const listItem = el('button.autocompleteItem', item);
          listItem.style.width = `${input.offsetWidth - 2}px`;
          listItem.addEventListener('click', function (e) {
            e.preventDefault();
            input.value = this.textContent;
            wrap.classList.remove('autocompleteWrapOpen');
          });
          list.append(listItem);
        }
      }
    } else {
      wrap.classList.remove('autocompleteWrapOpen');
    }
  });
  // скрыть элемент если клик за его пределами
  document.addEventListener('click', (e) => {
    const withinBoundaries = e.composedPath().includes(list);
    if (!withinBoundaries) {
      list.innerHTML = '';
    }
  });
}
