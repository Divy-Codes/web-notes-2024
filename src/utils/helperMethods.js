export function debounce(func, delay = 500) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//Searching Notes with title
export const searchWithTitle = (notes, title) => {
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(title.toLowerCase());
  });

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
