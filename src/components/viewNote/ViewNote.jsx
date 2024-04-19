import { useNotes } from '../contextProvider/NotesProvider';
import Markdown from 'react-markdown';
import './viewNote.scss';
import remarkGfm from 'remark-gfm';

export default function ViewNote() {
  const [
    {
      config: { activeNote },
    },
  ] = useNotes();
  return (
    <div className='viewNoteContainer'>
      {activeNote && (
        <div>
          <h1 className='primaryTitle'>{activeNote.title}</h1>
          <div className='markdown'>
            <Markdown remarkPlugins={[remarkGfm]}>{activeNote.body}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
