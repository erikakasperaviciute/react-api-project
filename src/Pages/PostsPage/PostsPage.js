import { useState, useEffect } from "react";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import "./PostsPage.css";
import firstLetterUpperCase from "../../utils";
import axios from "axios";

function PostsPage() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?_expand=user&_embed=comments"
    );
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch(
  //       "https://jsonplaceholder.typicode.com/posts?_expand=user&_embed=comments"
  //     );
  //     const postsData = await res.json();
  //     setPosts(postsData);
  //   };

  //   fetchPosts();
  // }, []);

  return (
    <Container>
      <h1>Posts Page</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/posts/${post.id}`} className="post-title">
              {firstLetterUpperCase(post.title)}.
            </Link>{" "}
            Author:
            <Link to={`/users/${post.user.id}`} className="post-author">
              {" "}
              {post.user.name}
            </Link>{" "}
            ({post.comments.length} Comments)
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default PostsPage;
