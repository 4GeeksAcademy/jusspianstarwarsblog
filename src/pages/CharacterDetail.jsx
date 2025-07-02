import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const { uid } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then(res => res.json())
      .then(data => setCharacter(data.result.properties))
      .catch(err => console.error(err));
  }, [uid]);

  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${uid}.jpg`;

  return (
    <div className="character-detail-page">
      {character ? (
        <>
          <div className="character-top">
            <img
              src={imageUrl}
              alt={character.name}
              className="character-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
            <div className="character-view">
              <h1>{character.name}</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          <hr className="red-divider" />

          <div className="character-attributes">
            <div className="attribute">
              <span className="label">Birth Year</span>
              <span className="value">{character.birth_year}</span>
            </div>
            <div className="attribute">
              <span className="label">Gender</span>
              <span className="value">{character.gender}</span>
            </div>
            <div className="attribute">
              <span className="label">Height</span>
              <span className="value">{character.height} cm</span>
            </div>
            <div className="attribute">
              <span className="label">Eye Color</span>
              <span className="value">{character.eye_color}</span>
            </div>
            <div className="attribute">
              <span className="label">Skin Color</span>
              <span className="value">{character.skin_color}</span>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterDetail;
