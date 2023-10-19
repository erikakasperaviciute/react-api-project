import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import axios from "axios";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments&_expand=user`
      );
      setPost(data);
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

  const postElement = post && (
    <div>
      <h2>{firstLetterUpperCase(post.title)}</h2>
      <p>{firstLetterUpperCase(post.body)}</p>
      <span>
        Author: <Link to={`/users/${post.user.id}`}>{post.user.name}</Link>
      </span>
      <div>
        <h3>
          <span>🗨️ ({post.comments.length})</span> Comments:
        </h3>

        {post.comments.map((comment) => (
          <div key={comment.id}>
            <h4>{firstLetterUpperCase(comment.name)}</h4>
            <p>{firstLetterUpperCase(comment.body)}.</p>
            <span>- {comment.email}</span>
          </div>
        ))}
      </div>
      <Link to={"/posts"}> Other posts by the author</Link>
    </div>
  );
  return <Container>{postElement}</Container>;
}

export default PostPage;
