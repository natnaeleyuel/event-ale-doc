import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {Link} from 'react-router-dom';

export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    fetch(`https://event-ale-doc.onrender.com/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      <div className="image">
        <img src={`https://event-ale-doc.onrender.com/${postInfo.cover}`} alt=""/>
      </div>
      <div>
        <h3>Summary</h3>
        <div className="summary" dangerouslySetInnerHTML={{__html:postInfo.summary}} />
        <h3>Content</h3>
        <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
      </div>
    </div>
  );
}
