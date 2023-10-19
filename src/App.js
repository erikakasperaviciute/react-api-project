import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./Components/PageHeader/PageHeader";
import UsersPage from "./Pages/UsersPage/UsersPage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import AlbumsPage from "./Pages/AlbumsPage/AlbumsPage";
import PostPage from "./Pages/PostPage/PostPage";
import UserPage from "./Pages/UserPage/UserPage";
import AlbumPage from "./Pages/AlbumPage/AlbumPage";
function App() {
  return (
    <div>
      <PageHeader />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
      </Routes>
    </div>
  );
}

export default App;
