import { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Popular from "./Popular";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { ThemeContext } from "../context/ThemeContext";
const Home = () => {
  const [popular, setPopular] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const getApi = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => setPopular(data.results))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <div className={`${theme ? "dark" : ""} dark:bg-slate-900 bg-white `}>
        <div className="dark:bg-slate-900 bg-white text-black dark:text-white ">
          {isLoading && <Loading />}
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {popular.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className="h-[500px] md:h-[800px] overflow-hidden relative">
                  <img
                    className="h-full object-cover w-full"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  />
                  <div className="absolute bottom-20 left-16 md:bottom-36 md:left-44 text-start flex flex-col gap-4 w-2/3 md:w-1/2 z-10 bg-black/20 p-4 rounded">
                    <Header>{movie.title}</Header>
                    <div className="flex flex-col md:flex-row items-center gap-x-8">
                      <h2 className="text-2xl">{movie.release_date}</h2>
                      <span className="text-2xl">
                        {movie.vote_average}
                        <i className="fas fa-star ml-2 text-yellow-400"></i>
                      </span>
                    </div>
                    <p className="text-lg md:text-xl italic line-clamp-6 md:line-clamp-none">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
          <Popular />
        </div>
      </div>
    </>
  );
};

export default Home;
