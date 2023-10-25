import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import axios from "axios";
import { API_URL } from "../../../src/config";

function PostPage() {
  const { id, commentId } = useParams();
  const [post, setPost] = useState(null);
  const [postDeleted, setPostDeleted] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [isCommentSaved, setIsCommentSaved] = useState(false);

  const nameHandler = (e) => setName(e.target.value);
  const bodyHandler = (e) => setBody(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(
        `${API_URL}/posts/${id}?_embed=comments&_expand=user`
      );
      setPost(data);
      setComments(data.comments);
      console.log(data.comments);
    };

    getPost();
  }, [id]);

  // useEffect(() => {
  //   async function fetchPost() {
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments&_expand=user`
  //     );
  //     const postData = await res.json();

  //     setPost(postData);
  //   }

  //   fetchPost();
  // }, [id]);

  const removePostHandler = () => {
    fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });

    setPostDeleted(true);
  };

  const removeCommentHandler = (id) => {
    fetch(`${API_URL}/comments/${id}`, {
      method: "DELETE",
    }).then((response) => {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
      setCommentDeleted(true);
    });
  };

  const newCommentHandler = (e) => {
    e.preventDefault();

    const newComment = {
      postId: Number(id),
      name,
      body,
      email,
    };

    fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prevComments) => [...prevComments, data]);
        setName("");
        setBody("");
        setEmail("");
        setIsCommentSaved(true);
        setTimeout(() => {
          setIsCommentSaved(false);
        }, 3000);
      });
  };

  const postElement = post && (
    <div>
      <Link to={`/edit-post/${id}`}>Edit Post</Link>
      <button onClick={removePostHandler}>Delete Post</button>
      <h2>{firstLetterUpperCase(post.title)}</h2>
      <p>{firstLetterUpperCase(post.body)}</p>
      <span>
        Author: <Link to={`/users/${post.user.id}`}>{post.user.name}</Link>
      </span>
      <div>
        <h3>
          <span>🗨️ ({comments.length})</span> Comments:
        </h3>

        {comments.map((comment) => (
          <div key={comment.id}>
            <Link to={`/edit-comment/${id}`}>Edit Comment</Link>
            <button onClick={() => removeCommentHandler(comment.id)}>
              Delete Comment
            </button>

            <h4>{firstLetterUpperCase(comment.name)}</h4>
            <p>{firstLetterUpperCase(comment.body)}.</p>
            <span>- {comment.email}</span>
          </div>
        ))}
      </div>
      <Link to={"/posts"}> Other posts by the author</Link>
    </div>
  );

  const newCommentFormElement = (
    <>
      <h3>Leave a comment</h3>
      <form onSubmit={newCommentHandler}>
        <div className="form-control">
          <label htmlFor="email">Your email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={emailHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Comment:</label>
          <textarea name="body" id="body" value={body} onChange={bodyHandler} />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
  return (
    <Container>
      {postDeleted ? (
        <>
          <p>Post deleted</p>
          <Link to="/posts">Go back to posts</Link>
        </>
      ) : (
        postElement
      )}
      {newCommentFormElement}
      {isCommentSaved && <span>Comment saved</span>}
    </Container>
  );
}

export default PostPage;
