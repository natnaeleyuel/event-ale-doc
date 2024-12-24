import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";

import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('https://event-ale-doc.onrender.com/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  const handleFileChange = (ev) => {
    const files = ev.target.files;
    const validFiles = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    );
  
    if (validFiles.length === files.length) {
      setFiles(validFiles);
    } else {
      alert('Please select only image files.');
    }
  };
  

  return (
    <form onSubmit={createNewPost}>
      <input className='title' type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} required/>
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} required/>
      <input type="file" accept="image/" 
             onChange={ev => {
              const files = ev.target.files;
              const validFiles = Array.from(files).filter(file =>
                file.type.startsWith('image/')
              );
            
              if (validFiles.length === files.length) {
                setFiles(validFiles);
              } else {
                ev.target.value = '';
                alert('Please select only image files.');
              }
              setFiles(ev.target.files)}} required
      />
      <Editor value={content} onChange={setContent} required/>
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}
