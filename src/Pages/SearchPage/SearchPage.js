import { useState, useEffect } from "react";
import Container from "../../Components/Container/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import { useLocation } from "react-router-dom";
import SearchFormForNav from "../../Components/SearchFormForNav/SearchFormForNav";
import { API_URL } from "../../../src/config";

function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const postsResponse = await axios.get(`${API_URL}/posts?q=${searchTerm}`);

    const usersResponse = await axios.get(`${API_URL}/users?q=${searchTerm}`);
    const albumsResponse = await axios.get(`${API_URL}/albums?q=${searchTerm}`);

    const postsResults = postsResponse.data;
    console.log(postsResults);
    const usersResults = usersResponse.data;
    const albumsResults = albumsResponse.data;

    setSearchResults({
      posts: postsResults,
      users: usersResults,
      albums: albumsResults,
    });
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  return (
    <Container>
      <h1>Search results:</h1>

      <SearchFormForNav onSearch={handleSearch} />

      {/* Neveikia no results  */}
      {!searchResults ? (
        <p>No results found</p>
      ) : (
        <>
          {searchResults.users && searchResults.users.length > 0 && (
            <div>
              <h3>Users found:</h3>
              <ul>
                {searchResults.users.map((user) => (
                  <Link to={`/users/${user.id}`}>
                    <li key={user.id}>{user.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}

          {searchResults.posts && searchResults.posts.length > 0 && (
            <div>
              <h3>Posts found:</h3>
              <ul>
                {searchResults.posts.map((post) => (
                  <Link to={`/posts/${post.id}`}>
                    <li key={post.id}>{firstLetterUpperCase(post.title)}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}

          {searchResults.albums && searchResults.albums.length > 0 && (
            <div>
              <h3>Albums found:</h3>
              <ul>
                {searchResults.albums.map((album) => (
                  <Link to={`/albums/${album.id}`}>
                    <li key={album.id}>{firstLetterUpperCase(album.title)}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default SearchPage;
