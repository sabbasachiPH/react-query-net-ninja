import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const People = () => {
  const [page, setPage] = useState(1);
  const fetchPerson = async (page) => {
    const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    return res.json();
  };
  const { data, status, isFetching } = useQuery(
    ["person", page],
    () => fetchPerson(page),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>People</h2>
      {status === "error" && <div>Error in Data fetching </div>}
      {status === "loading" && <div>Please wait Data is loading. </div>}
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
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
