export function debounce(func, delay = 500) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//Pressing enter on title would tab to body instead of submitting the form
export const pressEntertoFocusOn = (e, element) => {
  e.target.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      element.focus();
      // bodyRef.current.focus();
    }
  });
};
