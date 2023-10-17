import React, { useState, useEffect } from "react";
import BirdDataService from "../services/BirdService";

const Bird = props => {
  const initialBirdState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentBird, setCurrentBird] = useState(initialBirdState);
  const [message, setMessage] = useState("");

  const getBird = id => {
    BirdDataService.get(id)
      .then(response => {
        setCurrentBird(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBird(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBird({ ...currentBird, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBird.id,
      title: currentBird.title,
      description: currentBird.description,
      published: status
    };

    BirdDataService.update(currentBird.id, data)
      .then(response => {
        setCurrentBird({ ...currentBird, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBird = () => {
    BirdDataService.update(currentBird.id, currentBird)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBird = () => {
    BirdDataService.remove(currentBird.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/birds");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBird ? (
        <div className="edit-form">
          <h4>Bird</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBird.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBird.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBird.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBird.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBird}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBird}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Bird...</p>
        </div>
      )}
    </div>
  );
};

export default Bird;