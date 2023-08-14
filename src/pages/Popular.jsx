import { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { ThemeContext } from "../context/ThemeContext";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [pageNum, setPageNum] = useState(2);
  const [newPage, setNewPage] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const getApi = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => setPopular(data.results))
      .finally(() => setLoading(false));
  };

  const loadMore = async () => {
    setPageNum((prev) => prev + 1);
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${pageNum}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => setNewPage(data.results))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <div className={`${theme ? "dark" : ""} `}>
        <div className="dark:bg-slate-900  bg-white dark:text-white">
          <h1 className="container mx-auto text-3xl py-6 text-black dark:text-white">
            Popular
          </h1>
          {isLoading && <Loading />}
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 overflow-hidden pb-8">
            {popular.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Card className={"relative  card-container cursor-pointer"}>
                  <div className="absolute bottom-0 left-0 bg-black/30 p-4 card-content">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {movie.title}
                    </h1>
                    <div className="flex items-center gap-x-8">
                      <h2 className="text-xl">{movie.release_date}</h2>
                      <span className="text-xl">
                        {movie.vote_average}
                        <i className="fas fa-star ml-2 text-yellow-400"></i>
                      </span>
                    </div>
                    <p className="text-base italic line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>
                  <img
                    className="h-full object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                </Card>
              </Link>
            ))}
            {newPage.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Card
                  className={"relative h-full card-container cursor-pointer"}
                >
                  <div className="absolute bottom-0 left-0 bg-black/30 p-4 card-content">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <div className="flex items-center gap-x-8">
                      <h2 className="text-xl">{movie.release_date}</h2>
                      <span className="text-xl">
                        {movie.vote_average}
                        <i className="fas fa-star ml-2 text-yellow-400"></i>
                      </span>
                    </div>
                    <p className="text-base italic line-clamp-6">
                      {movie.overview}
                    </p>
                  </div>
                  <img
                    className="h-full object-cover rounded-md"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                </Card>
              </Link>
            ))}
            <button
              className="rounded-md text-yellow-800 font-bold hover:bg-yellow-300 duration-200 min-w-[150px] bg-yellow-400 text-center py-3"
              onClick={loadMore}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popular;
