import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_BOARDS } from "../../graphql/board.gql";

const Boards = () => {
  const { loading, error, data } = useQuery(GET_BOARDS);

  if (loading) {
    return <div className="loader" />;
  }

  return (
    <section className="section">
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="is-active">
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
              <td>{board.createdAt}</td>
              <td>
                <div className="buttons">
                  <Link className="button is-primary" to={`/boards/${board.slug}`}>
                    Show
                  </Link>
                  <button className="button is-info">Edit</button>
                  <button className="button is-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default memo(Boards);
