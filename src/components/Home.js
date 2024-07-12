import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TodosContext from "../context/context";
import styles from "../style.css";

const Home = () => {
  const [input, setInput] = useState({ name: "" });
  const { todos, setTodos, getAllTodos } = useContext(TodosContext);

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/todos", input);
    getAllTodos();
    setInput({ name: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    const remainingItems = todos.filter((item) => item.id !== id);
    setTodos(remainingItems);
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">My Todo App</h4>
                <form
                  onSubmit={handleAdd}
                  className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                >
                  <div className="col-12">
                    <div className="form-outline">
                      <input
                        name="name"
                        value={input.name}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Enter Task Here"
                        id="form1"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">
                      Add
                    </button>
                  </div>
                </form>
                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.length > 0 ? (
                      todos.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.name}</td>
                          <td>
                            <Link to={`/update/${item.id}`}>
                              <button type="submit" className="btn btn-primary">
                                <i className="fa fa-pencil"></i>
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id)}
                              type="submit"
                              className="btn btn-danger ms-1"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No Todos Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
