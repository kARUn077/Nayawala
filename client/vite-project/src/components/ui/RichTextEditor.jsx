import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';

const RichTextEditor = ({input , setInput}) => {
  const editor = useRef(null);

  const handleChange = (content) =>{
     setInput({...input, description: content})
  }
  return (
    <JoditEditor
        ref={editor}
        value={input.description}
        onChange={handleChange}
    />
);
}

export default RichTextEditor
