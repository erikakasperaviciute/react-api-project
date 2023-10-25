import { useState, useEffect } from "react";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import axios from "axios";
import { API_URL } from "../../../src/config";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function CreateAlbumPage() {
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios(`${API_URL}/users`);

      setUsers(data);
      setSelectedUser(data[0].id);
    };
    getUsers();
  }, []);

  const titleHandler = (e) => setTitle(e.target.value);
  const selectedUserHandler = (e) => setSelectedUser(e.target.value);

  const newAlbumHandler = async (e) => {
    e.preventDefault();

    const newAlbum = {
      title,
      userId: Number(selectedUser),
    };
    const res = await axios.post(`${API_URL}/albums`, newAlbum);

    if (res.statusText === "Created") {
      navigate(`/albums/${res.data.id}`);
    } else {
      console.error("Something went wrong");
    }
  };
  return (
    <Container>
      {users.length > 0 ? (
        <form onSubmit={newAlbumHandler}>
          <div className="form-control">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={titleHandler}
            />
          </div>

          <div className="form-control">
            <label htmlFor="user">User:</label>
            <select
              name="user"
              id="user"
              value={selectedUser}
              onChange={selectedUserHandler}
            >
              {users.map((userData) => (
                <option key={userData.id} value={userData.id}>
                  {userData.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Create Album</button>
        </form>
      ) : (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
          }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </Container>
  );
}

export default CreateAlbumPage;
