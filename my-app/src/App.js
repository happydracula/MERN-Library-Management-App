import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [rating, setRating] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updatePublisher, setUpdatePublisher] = useState("");
  const [updateRating, setUpdateRating] = useState("");
  const [data, setData] = useState([]);
  const [changed, setChanged] = useState(false);

  const [updateMode, setUpdateMode] = useState("");
  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:5000/display",
      headers: {},
    };
    console.log("Hello");
    axios(config)
      .then(function (response) {
        const data = JSON.stringify(response.data);
        const array = JSON.parse(data).array;
        console.log(data);
        setData(array);
        setChanged(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [changed]);
  const updateHandler = function (e) {
    console.log(e.title);
    setUpdateMode(e.title);
    setUpdateTitle(e.title);
    setUpdateAuthor(e.author);
    setUpdatePublisher(e.publisher);
    setUpdateRating(e.rating);
  };
  const deleteHandler = function (e) {
    axios({
      method: "POST",
      url: "http://localhost:5000/delete",
      data: {
        title: e.target.value,
      },
    })
      .then((response) => {
        console.log("Data has been sent to server");
        if (response.data.status === "success") {
          console.log("Data has been submitted");
          console.log(response);
          setChanged(true);
        }
      })
      .catch((e) => {
        console.log("Internal Server error" + e);
      });
  };
  const confirmHandler = function () {
    axios({
      method: "POST",
      url: "http://localhost:5000/update",
      data: {
        title: updateTitle,
        author: updateAuthor,
        publisher: updatePublisher,
        rating: updateRating,
      },
    })
      .then((response) => {
        console.log("Data has been sent to server");
        if (response.data.status === "success") {
          console.log("Data has been submitted");
          console.log(response);
          setChanged(true);
          setUpdateTitle("");
          setUpdateAuthor("");
          setUpdatePublisher("");
          setUpdateRating("");
          setUpdateMode("");
        }
      })
      .catch((e) => {
        console.log("Internal Server error" + e);
      });
  };
  const insertHandler = function () {
    axios({
      method: "POST",
      url: "http://localhost:5000/insert",
      data: {
        title: title,
        author: author,
        publisher: publisher,
        rating: rating,
      },
    })
      .then((response) => {
        console.log("Data has been sent to server");
        if (response.data.status === "success") {
          console.log("Data has been submitted");
          console.log(response);
          setChanged(true);
          setTitle("");
          setAuthor("");
          setPublisher("");
          setRating("");
        }
      })
      .catch((e) => {
        console.log("Internal Server error" + e);
      });
  };

  return (
    <div>
      <h3 class="card-title text-center display-4 mb-5">LIBRARY MANAGER</h3>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Publisher</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, key) => {
              if (updateMode != row.title) {
                return (
                  <tr class="table table-primary">
                    <th scope="row">{row.title}</th>
                    <td>{row.author}</td>
                    <td>{row.publisher}</td>
                    <td> {row.rating}</td>
                    <td>
                      <button
                        onClick={deleteHandler}
                        class="btn btn-info btn-sm"
                        value={row.title}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => updateHandler(row)}
                        class="btn btn-info btn-sm"
                        value={row}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr class="table table-primary">
                    <th scope="row">{row.title}</th>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={updateAuthor}
                        onInput={(e) => setUpdateAuthor(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        value={updatePublisher}
                        onInput={(e) => setUpdatePublisher(e.target.value)}
                      />{" "}
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        name=""
                        id=""
                        value={updateRating}
                        onInput={(e) => setUpdateRating(e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={confirmHandler}
                        class="btn btn-info btn-sm"
                      >
                        Confirm
                      </button>
                    </td>
                    <td></td>
                  </tr>
                );
              }
            })}
          <tr class="table table-primary">
            <th scope="row">
              <input
                type="text"
                name=""
                id=""
                value={title}
                onInput={(e) => setTitle(e.target.value)}
              />
            </th>
            <td>
              <input
                type="text"
                name=""
                id=""
                value={author}
                onInput={(e) => setAuthor(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name=""
                id=""
                value={publisher}
                onInput={(e) => setPublisher(e.target.value)}
              />{" "}
            </td>
            <td>
              {" "}
              <input
                type="text"
                name=""
                id=""
                value={rating}
                onInput={(e) => setRating(e.target.value)}
              />
            </td>
            <td>
              <button onClick={insertHandler} class="btn btn-info btn-sm">
                Add
              </button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
