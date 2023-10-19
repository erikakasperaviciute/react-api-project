import { useState, useEffect } from "react";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import "./UsersPage.css";
import axios from "axios";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users?_embed=posts"
    );
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await fetch(
  //       "https://jsonplaceholder.typicode.com/users?_embed=posts"
  //     );
  //     const usersData = await res.json();
  //     setUsers(usersData);
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <Container>
      <h1>Users Page</h1>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <Link to={`/users/${user.id}`} className="user-link">
              {user.name}
            </Link>
            ({user.posts.length} Posts)
          </li>
        ))}
      </ul>
    </Container>
  );
}
export default UsersPage;
