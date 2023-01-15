import axios from "axios";
import React, { useEffect, useState } from "react";
import Unsplash, { toJson } from 'unsplash-js'

const unsplash = new Unsplash({
    accessKey: "qpMAiO2ub0Zzhb0_7LOlPPkBCgdguwz3wvwBgm9Mgp8",
    secret: "3bOnVRREeDGmGSjW2QYbWfftYVWZKgaAz8dSTz0zLP8"
  });
export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.unsplash.com/photos/?client_id=qpMAiO2ub0Zzhb0_7LOlPPkBCgdguwz3wvwBgm9Mgp8")
      .then((res) => setPics(res.data))
      .catch((err) => console.log(err));
  }, []);


  const searchPhotos = async (e) => {
    e.preventDefault();
    console.log("Submitting the Form")

    
    query !=="" && unsplash.search
    .photos(query)
    .then(toJson)
    .then((json) => {
        console.log(json.results)
        setPics(json.results);
    });
    
  };

  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try "dog" or "apple"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
      {
          pics.map((pic) => 
            <div className="card" key={pic.id}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="50%"
                height="50%"
              ></img>
            </div>)
        }
      </div>
    </>
  );
}