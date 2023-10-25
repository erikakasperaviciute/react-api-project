import { useState, useEffect } from "react";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import axios from "axios";
import "./HomePage.css";
import { API_URL } from "../../../src/config";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    const { data } = await axios.get(
      `${API_URL}/posts?_expand=user&_embed=comments&_limit=5`
    );
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getAlbums = async () => {
    const { data } = await axios.get(
      `${API_URL}/albums?_expand=user&_embed=photos&_limit=4`
    );
    setAlbums(data);
    console.log(data);
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const getUsers = async () => {
    const { data } = await axios.get(`${API_URL}/users?_embed=posts&_limit=4`);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const postsElement = (
    <div>
      <h2>Newest posts</h2>
      <div className="posts-wrapper">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <div className="title-comments-wrapper">
              <h3>
                <Link to={`/posts/${post.id}`} className="post-title">
                  {firstLetterUpperCase(post.title)}
                </Link>
              </h3>
              <span>({post.comments.length} Comments)</span>
            </div>
            <p>{firstLetterUpperCase(post.body)}...</p>
            <span>
              Author:
              <Link to={`/users/${post.user.id}`} className="post-author">
                {post.user.name}
              </Link>
            </span>
          </div>
        ))}
      </div>
      <Link to={`/posts`} className="link-btn">
        <div className="button">View all posts</div>
      </Link>
    </div>
  );

  const albumsElement = (
    <div>
      <h2>Newest albums</h2>
      <div className="albums-wrapper">
        {albums.map((album) => (
          <div className="album-card" key={album.id}>
            <div className="album-title-wrapper">
              <h3 className="album-title">
                <Link to={`/albums/${album.id}`} className="album-title-link">
                  {firstLetterUpperCase(album.title)}
                </Link>
              </h3>
              <span>({album.photos.length} Photos)</span>
            </div>
            {album.photos.length > 0 && (
              <div>
                <Link to={`/albums/${album.id}`}>
                  <img src={album.photos[0].thumbnailUrl} alt="" />
                </Link>
              </div>
            )}
            <span>
              Author:
              <Link className="author-link" to={`/users/${album.user.id}`}>
                {album.user.name}
              </Link>
            </span>
          </div>
        ))}
      </div>

      <Link to={`/albums`} className="link-btn">
        <div className="button">View all albums</div>
      </Link>
    </div>
  );

  const usersElement = (
    <div>
      <h2>Newest users</h2>
      <div className="users-wrapper">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <Link to={`/users/${user.id}`} className="user-link">
              <h4>
                {user.name} ({user.username})
              </h4>
            </Link>
            <span>{user.email}</span>
          </div>
        ))}
      </div>
      <Link to={`/users`} className="link-btn">
        <div className="button">View all users</div>
      </Link>
    </div>
  );

  return (
    <Container>
      <div className="page-wrapper">
        <div>
          {postsElement} {usersElement}
        </div>
        {albumsElement}
      </div>
    </Container>
  );
}

export default HomePage;
