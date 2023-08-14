import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Popular from "./Popular";
import { ThemeContext } from "../context/ThemeContext";

const Movie = () => {
  const [currentMovie, setCurrentMovie] = useState([]);
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const getApi = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCurrentMovie(data);
        console.log(currentMovie);
      });
  };

  useEffect(() => {
    getApi();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location]);

  return (
    <>
      <div className={`${theme ? "dark" : ""} duration-200`}>
        <div className="dark:bg-slate-900 text-black bg-white dark:text-white">
          <div className="container mx-auto">
            <div className="h-[900px] md:h-[600px]  relative">
              <div className="absolute top-0 left-0 right-0 bottom-0 h-[900px] md:h-[600px]  w-full bg-black/40"></div>
              <img
                className="w-[600px] h-[600px] md:h-full md:w-full object-cover "
                src={`https://image.tmdb.org/t/p/original/${currentMovie?.backdrop_path}`}
              />
              <div className="z-20 top-96 absolute -bottom-40 left-0 md:left-24 flex flex-col md:flex-row">
                <img
                  className=" h-96 rounded-md object-contain w-80 md:block hidden"
                  src={`https://image.tmdb.org/t/p/original/${currentMovie?.poster_path}`}
                />
                <div className="flex flex-col ml-6 md:ml-12 gap-1 ">
                  <Header className={"text-white"}>
                    {currentMovie?.title}
                  </Header>
                  <div className="flex text-white flex-wrap items-center gap-x-2 mt-1 text-xl">
                    <span>
                      {currentMovie?.vote_average}
                      <i className="fas fa-star ml-2 text-yellow-400"></i>
                    </span>
                    <span>({currentMovie?.vote_count}) Votes</span>
                    <span>
                      Official Lang: ({currentMovie?.original_language})
                    </span>
                  </div>
                  <span className="text-white">
                    {currentMovie?.runtime} mins
                  </span>
                  <p className="mt-1 text-white">
                    Release Date : {currentMovie?.release_date}{" "}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-white">
                    {currentMovie && currentMovie.genres
                      ? currentMovie.genres.map((genre) => (
                          <>
                            <span key={genre.id} className="border p-2">
                              {genre.name}
                            </span>
                          </>
                        ))
                      : ""}
                  </div>
                  <div className="mt-6 ">
                    <h1 className="text-4xl font-bold mb-2 ">Overview</h1>
                    {currentMovie?.overview}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 md:mt-80  container mx-auto">
            <h2 className="text-center font-bold text-3xl ">Links</h2>
            <div className="flex justify-center my-4 gap-3">
              <a
                className="bg-red-500 hover:bg-red-400 duration-300 px-4 py-2 rounded-full"
                href={currentMovie?.homepage}
              >
                Movie Site
              </a>
              <a
                className="bg-yellow-500 hover:bg-yellow-400 duration-300 px-4 py-2 rounded-full"
                href={`https://www.imdb.com/title/${currentMovie?.imdb_id}`}
              >
                IMDB
              </a>
            </div>
            <h2 className="text-center font-bold text-3xl mt-16 mb-8">
              Production Companies
            </h2>
            <div className="flex gap-4 mt-2">
              {currentMovie && currentMovie.production_companies
                ? currentMovie.production_companies.map((prod) => (
                    <div className="flex flex-wrap mx-auto " key={prod.id}>
                      <img
                        className="h-36 w-36 p-4 rounded-md  object-contain bg-white/20"
                        src={`https://image.tmdb.org/t/p/original/${prod.logo_path}`}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <Popular />
        </div>
      </div>
    </>
  );
};

export default Movie;
