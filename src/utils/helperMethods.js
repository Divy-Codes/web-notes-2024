export function debounce(func, delay = 500) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      // func.apply(args);
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

//Searching Notes with title
export const searchWithTitle = (notes, title) => {
  console.log(`searchwithtitle triggered`);
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(title.toLowerCase());
  });
  console.log(`filteredNotes:`, filteredNotes);

  return filteredNotes;
};
export let debouncedSearchWithTitle = debounce(searchWithTitle, 1000);

//Searching Notes with tags
export const searchWithTags = (notes, tags) => {
  //seacrhedTags: {label,id}. //Notes only have tagIds
  const searchedTagIds = tags.map((tag) => tag.id);
  const filteredNotes = notes.filter((note) =>
    searchedTagIds.every((tagId) => note.tagIds.includes(tagId))
  );
  return filteredNotes;
};
export let debouncedSearchWithTags = debounce(searchWithTags, 1000);
