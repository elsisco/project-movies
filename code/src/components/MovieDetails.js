import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DETAILS_URL } from "utils/urls";
import { BackButton } from "../components/BackButton";
import styled from "styled-components";

const BackDropImg = styled.img`
  margin: 0 auto;
  height: 100vh;
  z-index: -1;
`;

const PosterImg = styled.img`
  position: absolute;
  width: 25%;
  border: 5px solid white;
  left: 50px;
  bottom: 50px;
`;

const MovieTitleDetails = styled.span`
  position: absolute;
  top: 50%;
  right: 50%;
`;

const DetailsTitle = styled.h3`
  color: white;
`;

const MovieRating = styled.span`
position: absolute;
top: 50%;
right:40%;
bottom: 0;
left:0: 
`;

const Rating = styled.p`
  color: red;
`;

const TotalRate = styled.p`
  color: white;
`;

const OverviewText = styled.p`
position: absolute;
top: 60%;
right:0;
bottom: 0;
left:0: 
`;

const DetailsOverview = styled.p`
  color: white;
`;

const ErrorText = styled.h2`
  text-align: center;
  color: white;
`;

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(DETAILS_URL(movieId))
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setMovie(data);
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true));
  }, [movieId]);

  if (hasError) {
    return <ErrorText>Sorry this page doesn't exist</ErrorText>;
  }

  return (
    <div>
      <BackButton />
      <BackDropImg
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : ""
        }
        alt={movie.title}
      />
      <PosterImg
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
            : ""
        }
        alt={movie.title}
      />
      <div>
        <MovieTitleDetails>
          <DetailsTitle>{movie.title}</DetailsTitle>
        </MovieTitleDetails>
        <MovieRating>
          <Rating>{movie.vote_average}</Rating>
          <TotalRate>/10</TotalRate>
        </MovieRating>
      </div>
      <OverviewText>
        <DetailsOverview>{movie.overview}</DetailsOverview>
      </OverviewText>
    </div>
  );
};

export default MovieDetails;
