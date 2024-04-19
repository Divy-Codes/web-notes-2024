import CreateableReactSelect from 'react-select/creatable';
import { useNotes } from '../contextProvider/NotesProvider';
import { actions } from '../contextProvider/NotesProvider';
import { v4 as uuidv4 } from 'uuid';

export default function SelectTags({
  selectedTags = [],
  setSelectedTags = (f) => f,
}) {
  //   const [selectedTags, setSelectedTags] = useState([]);
  const [{ tags }, dispatch] = useNotes();

  return (
    <div>
      <CreateableReactSelect
        isMulti
        //Options is total number of tags already created
        options={tags.map((tag) => ({
          label: tag.label,
          value: tag.id,
        }))}
        //Value is total tags selected for the specific note
        value={selectedTags.map((tag) => ({
          label: tag.label,
          value: tag.id,
        }))}
        //onChange called when there is a change in tags of that note.
        onChange={(tags) =>
          setSelectedTags(
            tags.map((tag) => {
              return { label: tag.label, id: tag.value };
            })
          )
        }
        //If onCreateOption is defined, onChange is not called when a new option is created.
        onCreateOption={(label) => {
          //Create a new tag. Add it to tags list and then change the tags for that note as well
          const newTag = { label: label, id: uuidv4() };
          setSelectedTags((prevTags) => [...prevTags, newTag]);
          dispatch({ type: actions.ADD_NEW_TAGS, payload: { newTag } });
        }}
      />
    </div>
  );
}
