import { useState } from "react";
import Container from "../../Components/Container/Container";
import { API_URL } from "../../../src/config";

function CreateUserPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [bs, setBs] = useState("");
  const [isUserSaved, setIsUserSaved] = useState(false);

  const nameHandler = (e) => setName(e.target.value);
  const usernameHandler = (e) => setUsername(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);
  const streetHandler = (e) => setStreet(e.target.value);
  const suiteHandler = (e) => setSuite(e.target.value);
  const cityHandler = (e) => setCity(e.target.value);
  const zipcodeHandler = (e) => setZipcode(e.target.value);
  const latHandler = (e) => setLat(e.target.value);
  const lngHandler = (e) => setLng(e.target.value);
  const phoneHandler = (e) => setPhone(e.target.value);
  const websiteHandler = (e) => setWebsite(e.target.value);
  const companyNameHandler = (e) => setCompanyName(e.target.value);
  const catchPhraseHandler = (e) => setCatchPhrase(e.target.value);
  const bsHandler = (e) => setBs(e.target.value);

  const newUserHandler = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: { lat, lng },
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setName("");
        setUsername("");
        setEmail("");
        setStreet("");
        setSuite("");
        setCity("");
        setZipcode("");
        setLat("");
        setLng("");
        setPhone("");
        setWebsite("");
        setCompanyName("");
        setCatchPhrase("");
        setBs("");
        setIsUserSaved(true);
        setTimeout(() => {
          setIsUserSaved(false);
        }, 3000);
      });
  };

  const createUserFormElement = (
    <>
      <h1>Create New User</h1>
      <form onSubmit={newUserHandler}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={nameHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={usernameHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={emailHandler}
          />
        </div>
        <span>Address:</span>
        <div className="form-control">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={streetHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="suite">Suite:</label>
          <input
            type="text"
            name="suite"
            id="suite"
            value={suite}
            onChange={suiteHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={cityHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            value={zipcode}
            onChange={zipcodeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="lat">Latitude:</label>
          <input
            type="number"
            name="lat"
            id="lat"
            value={lat}
            onChange={latHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="lng">Longitude:</label>
          <input
            type="number"
            name="lng"
            id="lng"
            value={lng}
            onChange={lngHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone number:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            onChange={phoneHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="website">Website:</label>
          <input
            type="url"
            name="website"
            id="website"
            value={website}
            onChange={websiteHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={companyName}
            onChange={companyNameHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="catchPhrase">Catch Phrase:</label>
          <input
            type="text"
            name="catchPhrase"
            id="catchPhrase"
            value={catchPhrase}
            onChange={catchPhraseHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="bs">Bs:</label>
          <input
            type="text"
            name="bs"
            id="bs"
            value={bs}
            onChange={bsHandler}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );

  return (
    <Container>
      {createUserFormElement}
      {isUserSaved && <span>User saved</span>}
    </Container>
  );
}
export default CreateUserPage;
