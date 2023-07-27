import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { ThemeContext } from "../context/ThemeContext";

const TopRated = () => {
  const [movie, setMovie] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const getApi = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${pageNum}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setMovie(data.results))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getApi();
  }, [pageNum]);

  const nextPage = () => {
    setPageNum((prev) => Math.max(prev + 1, 1));
  };
  const prevPage = () => {
    setPageNum((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div className={`${theme ? "dark" : ""} `}>
        <div className="dark:bg-slate-900 text-black bg-white dark:text-white">
          <div className="  flex justify-between items-center container mx-auto py-6">
            <h1 className=" text-3xl">Top Rated</h1>
            {isLoading && <Loading />}

            <div className="flex gap-2 text-xl">
              <button onClick={prevPage}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <span>{pageNum}</span>
              <button onClick={nextPage}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 overflow-hidden pb-8">
            {movie.map((movie) => (
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
                    <p className="text-base italic line-clamp-3 ">
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
          </div>
          <div className="flex gap-2 container mx-auto justify-end pb-6 text-xl">
            <button onClick={prevPage}>
              <i className="fa-solid fa-chevron-left "></i>
            </button>
            <span>{pageNum}</span>
            <button onClick={nextPage}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRated;
