import { useState, useEffect } from "react";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import "./AlbumsPage.css";

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos"
      );
      const albumsData = await res.json();
      console.log(albumsData);
      setAlbums(albumsData);
    };

    fetchAlbums();
  }, []);

  return (
    <Container>
      <h1>Albums Page</h1>

      {albums.map((album) => (
        <div key={album.id}>
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
              <img src={album.photos[0].thumbnailUrl} alt="" />
            </div>
          )}
          <span>
            Author:
            <Link to={`/users/${album.user.id}`}> {album.user.name}</Link>
          </span>
        </div>
      ))}
    </Container>
  );
}
export default AlbumsPage;
