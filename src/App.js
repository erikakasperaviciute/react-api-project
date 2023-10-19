import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./Components/PageHeader/PageHeader";
import UsersPage from "./Pages/UsersPage/UsersPage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import AlbumsPage from "./Pages/AlbumsPage/AlbumsPage";
function App() {
  return (
    <div>
      <PageHeader />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
      </Routes>
    </div>
  );
}

export default App;
