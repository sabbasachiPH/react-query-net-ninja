import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const Planets = () => {
  const [page, setPage] = useState(1);

  const fetchPlanets = async (page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
  };

  const { data, status, isFetching } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    { keepPreviousData: true }
  );

  return (
    <div>
      <h2>Planets</h2>
      {status === "error" && <div>Error in Data fetching </div>}
      {status === "loading" && <div>Please wait Data is loading.... </div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={!data.previous}
          >
            Previous Page
          </button>
          <span>Current Page: {page}</span>{" "}
          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={!data.next}
          >
            Next Page
          </button>
          {isFetching ? <span> Loading...</span> : null}{" "}
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
