import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { API_URL } from "../../../src/config";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function EditAlbumPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [isAlbumSaved, setIsAlbumSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios(`${API_URL}/users`);

      setUsers(data);
      setSelectedUser(data[0].id);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getAlbum = async () => {
      const { data } = await axios(`${API_URL}/albums/${id}`);
      setTitle(data.title);
      setSelectedUser(data.userId);
    };
    getAlbum();
  }, [id]);

  const titleHandler = (e) => setTitle(e.target.value);
  const selectedUserHandler = (e) => setSelectedUser(e.target.value);

  const newAlbumHandler = async (e) => {
    e.preventDefault();

    const newAlbum = {
      id: Number(id),
      title,
      userId: Number(selectedUser),
    };
    const res = await axios.put(`${API_URL}/albums/${id}`, newAlbum);

    if (res.status === 200) {
      setIsAlbumSaved(true);
      setTimeout(() => {
        navigate(`/albums/${id}`);
      }, 2000);
    } else {
      console.error("Something went wrong");
    }
  };
  return (
    <Container>
      {isAlbumSaved ? (
        <p>Album was successfully updated!</p>
      ) : users.length > 0 ? (
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

          <button type="submit">Save</button>
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

export default EditAlbumPage;
