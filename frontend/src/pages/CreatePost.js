import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function createNewPost(ev) {
    ev.preventDefault();

    // Prepare FormData
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files.length > 0) {
      data.set('file', files[0]);
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://event-ale-doc.onrender.com/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Failed to create post');
      }
    } catch (error) {
      setErrorMessage('Network error: Failed to create post');
    } finally {
      setIsLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  const handleFileChange = (ev) => {
    const files = ev.target.files;
    const validFiles = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    );

    if (validFiles.length === files.length) {
      setFiles(validFiles);
    } else {
      ev.target.value = ''; // Reset input
      alert('Please select only image files.');
    }
  };

  return (
    <form onSubmit={createNewPost}>
      <input
        className='title'
        type="text"
        placeholder='Title'
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder='Summary'
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <Editor value={content} onChange={setContent} required />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button type="submit" style={{ marginTop: '5px' }} disabled={isLoading}>
        {isLoading ? 'Creating Post...' : 'Create Post'}
      </button>
    </form>
  );
}
