import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import axios from "axios";
import { API_URL } from "../../../src/config";

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userDeleted, setUserDeleted] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(
        `${API_URL}/users/${id}?_embed=posts&_embed=albums`
      );
      setUser(data);
    };

    getUser();
  }, [id]);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/users/${id}?_embed=posts&_embed=albums`
  //     );
  //     const userData = await res.json();
  //     setUser(userData);
  //   }

  //   fetchUser();
  // }, [id]);

  const removeUserHandler = () => {
    fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    setUserDeleted(true);
  };

  const userElement = user && (
    <div>
      <Link to={`/edit-user/${id}`}>Edit User</Link>
      <button onClick={removeUserHandler}>Delete User</button>
      <h2>{user.name}</h2>
      <div>
        <ul>
          <li>Username: {user.username}</li>
          <li>
            Email: <a href={`mailto:${user.email}`}>{user.email}</a>
          </li>

          <li>
            Address:
            <a
              href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
              target="blank"
            >
              {user.address.street} str. {user.address.suite},{" "}
              {user.address.city},{user.address.zipcode}.
            </a>
          </li>

          <li>
            Phone number: <a href={`tel:${user.phone}`}>{user.phone}</a>
          </li>
          <li>
            Web page:{" "}
            <a href={user.website} target="blank">
              {user.website}
            </a>
          </li>
          <li>Works at: {user.company.name}</li>
        </ul>
      </div>
      <div>
        <h3>Posts:</h3>
        {user.posts && (
          <ol>
            {user.posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  {firstLetterUpperCase(post.title)}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div>
        <h3>Albums:</h3>
        {user.albums && (
          <ol>
            {user.albums.map((album) => (
              <li key={album.id}>
                <Link to={`/albums/${album.id}`}>
                  {firstLetterUpperCase(album.title)}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
  return (
    <Container>
      {userDeleted ? (
        <>
          <p>User deleted</p>
          <Link to="/users">Go back to users</Link>
        </>
      ) : (
        userElement
      )}
    </Container>
  );
}

export default UserPage;
