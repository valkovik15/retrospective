import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_BOARDS = gql`
  query getBoards {
    boards {
      title
    }
  }
`;

const Boards = () => {
  const { loading, error, data } = useQuery(GET_BOARDS);

  if (loading) {
    return <div className="loader" />;
  }

  return (
    <section class="section">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">
              Boards
            </a>
          </li>
        </ul>
      </nav>
      <h1 className="title">Your boards</h1>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DATE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.boards.map(board => (
            <tr key={board.title}>
              <td>{board.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default memo(Boards);
