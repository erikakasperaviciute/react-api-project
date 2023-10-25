import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./Components/PageHeader/PageHeader";
import UsersPage from "./Pages/UsersPage/UsersPage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import AlbumsPage from "./Pages/AlbumsPage/AlbumsPage";
import PostPage from "./Pages/PostPage/PostPage";
import UserPage from "./Pages/UserPage/UserPage";
import AlbumPage from "./Pages/AlbumPage/AlbumPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import HomePage from "./Pages/HomePage/HomePage";
import CreatePostPage from "./Pages/CreatePostPage/CreatePostPage";
import EditPostPage from "./Pages/EditPostPage/EditPostPage";
import CreateUserPage from "./Pages/CreateUserPage/CreateUserPage";
import EditUserPage from "./Pages/EditUserPage/EditUserPage";
import EditCommentPage from "./Pages/EditCommentPage/EditCommentPage";
import CreateAlbumPage from "./Pages/CreateAlbumPage/CreateAlbumPage";
import EditAlbumPage from "./Pages/EditAlbumPage/EditAlbumPage";

function App() {
  return (
    <div>
      <PageHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/edit-post/:id" element={<EditPostPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/edit-user/:id" element={<EditUserPage />} />
        <Route path="/create-album/" element={<CreateAlbumPage />} />
        <Route path="/edit-album/:id" element={<EditAlbumPage />} />
        {/* <Route
          path="/edit-comment/:id/:commentId"
          element={<EditCommentPage />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
