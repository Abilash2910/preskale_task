import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";

const BirdList = () => {
  const [birds, setBirds] = useState([
    {
      id: 1,
      title: "Sample Bird 1",
      description: "Description of Sample Bird 1",
      published: true,
    },
    {
      id: 2,
      title: "Sample Bird 2",
      description: "Description of Sample Bird 2",
      published: false,
    },
    {
      id: 3,
      title: "Sample Bird 3",
      description: "Description of Sample Bird 3",
      published: true,
    },
    {
      id: 4,
      title: "Sample Bird 4",
      description: "Description of Sample Bird 4",
      published: false,
    },
    {
      id: 5,
      title: "Sample Bird 5",
      description: "Description of Sample Bird 5 ",
      published: true,
    },
    // Add more sample data as needed
  ]);

  const [searchTitle, setSearchTitle] = useState("");
  
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          return (
            <div>
              <span onClick={() => openBirds(props.row.index)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
              <span onClick={() => deleteBird(props.row.index)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: birds,
  });

  const openBirds = (rowIndex) => {
    // Add code to handle opening a specific bird record
    console.log("Open bird with ID: " + birds[rowIndex].id);
  };

  const deleteBird = (rowIndex) => {
    // Add code to handle deleting a specific bird record
    console.log("Delete bird with ID: " + birds[rowIndex].id);
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const searchBirds = () => {
    // Implement the logic to filter birds based on the searchTitle
    // Set the filtered birds to the 'birds' state
    // Example:
    // const filteredBirds = birds.filter(bird => bird.title.includes(searchTitle));
    // setBirds(filteredBirds);
  };

  const removeAllBirds = () => {
    // Implement the logic to remove all birds
    // Example:
    // setBirds([]);
  };

  return (
    <div className="list row">
      <div className="col-md-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchBirds}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table className="table table-striped table-bordered" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllBirds}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default BirdList;
