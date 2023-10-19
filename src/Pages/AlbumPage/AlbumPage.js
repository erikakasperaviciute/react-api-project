import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import SimpleGallery from "../../SimpleGallery";
import "photoswipe/dist/photoswipe.css";
import "./AlbumPage.css";

function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchAlbum() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`
      );
      const albumData = await res.json();
      setAlbum(albumData);
    }

    fetchAlbum();
  }, [id]);

  const albumElement = album ? (
    <div className="album-wrapper">
      <h2>{firstLetterUpperCase(album.title)}</h2>
      <span>
        Author:<Link to={`/users/${album.user.id}`}>{album.user.name}</Link>
      </span>
      {album.photos && album.photos.length > 0 && (
        <SimpleGallery
          galleryID="albumGallery"
          images={album.photos.map((photo) => ({
            largeURL: photo.url,
            thumbnailURL: photo.thumbnailUrl,
            width: photo.width,
            height: photo.height,
          }))}
        />
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );

  return <Container>{albumElement}</Container>;
}

export default AlbumPage;

// function AlbumPage() {
//   const { id } = useParams();
//   const [album, setAlbum] = useState(null);

//   useEffect(() => {
//     async function fetchAlbum() {
//       const res = await fetch(
//         `https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`
//       );
//       const albumData = await res.json();

//       setAlbum(albumData);
//       console.log(albumData);
//     }

//     fetchAlbum();
//   }, [id]);

//   const albumElement = album && (
//     <div>
//       <h2>{firstLetterUpperCase(album.title)}</h2>
//       <span>
//         Author: <Link to={`/users/${album.user.id}`}>{album.user.name}</Link>
//       </span>
//       <div>
//         {album.photos.map((photo) => (
//           <img key={photo.id} src={photo.thumbnailUrl} alt="" />
//         ))}
//       </div>
//     </div>
//   );

//   return <Container>{albumElement}</Container>;
// }

// export default AlbumPage;
