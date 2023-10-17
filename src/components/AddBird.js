import React, { useState } from "react";
import  BirdDataService from "../services/BirdService";

const AddBird = () => {
  const initialBirdState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [bird, setBird] = useState(initialBirdState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBird({ ...bird, [name]: value });
  };

  const saveBird = () => {
    console.log("came here");
    var data = {
      title: bird.title,
      description: bird.description
    };

    BirdDataService.create(data)
      .then(response => {
        setBird({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBird = () => {
    setBird(initialBirdState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBird}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={bird.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={bird.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveBird} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBird;