import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import firstLetterUpperCase from "../../utils";
import SimpleGallery from "../../SimpleGallery";
import "photoswipe/dist/photoswipe.css";
import "./AlbumPage.css";
import axios from "axios";
import { API_URL } from "../../../src/config";
import { Oval } from "react-loader-spinner";

function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const navigate = useNavigate();
  const [isAlbumDeleted, setIsAlbumDeleted] = useState(false);

  useEffect(() => {
    const getAlbum = async () => {
      const { data } = await axios.get(
        `${API_URL}/albums/${id}?_expand=user&_embed=photos`
      );
      setAlbum(data);
    };

    getAlbum();
  }, [id]);

  // useEffect(() => {
  //   async function fetchAlbum() {
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`
  //     );
  //     const albumData = await res.json();
  //     setAlbum(albumData);
  //   }

  //   fetchAlbum();
  // }, [id]);

  const removeAlbumHandler = async () => {
    const res = await axios.delete(`${API_URL}/albums/${id}`);
    if (res.statusText === "OK" || res.status === 200) {
      setIsAlbumDeleted(true);
      setTimeout(() => {
        navigate("/albums");
      }, 2000);
    } else {
      console.error("Something went wrong");
    }
  };

  const albumElement = album ? (
    <div className="album-wrapper">
      {isAlbumDeleted ? (
        <p>
          Album {firstLetterUpperCase(album.title)} was successfully deleted!
        </p>
      ) : (
        <>
          <button onClick={removeAlbumHandler}>Delete Album</button>
          <Link to={`/edit-album/${id}`}>Edit Album</Link>
          <h2>{firstLetterUpperCase(album.title)}</h2>
          <span>
            Author:
            <Link to={`/users/${album.user.id}`} className="author-link">
              {album.user.name}
            </Link>
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
          )}{" "}
        </>
      )}
    </div>
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
  );

  return <Container>{albumElement}</Container>;
}

export default AlbumPage;
