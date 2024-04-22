import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        isbn: "",
        author: "",
    });

    const [error, setError] = useState(null);

    const onChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8082/api/books", book);
            console.log(response.data);
            setBook({ title: "", isbn: "", author: "" });
            navigate("/");
        } catch (error) {
            setError("Error adding book. Please try again.");
            console.error("Error in CreateBook:", error);
        }
    };

    return (
        <div className="CreateBook">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                        <Link to="/" className="btn btn-outline-warning float-left">
                            Show Book List
                        </Link>
                    </div>
                    <div className="col-md-10 m-auto">
                        <h1 className="display-4 text-center">Add Book</h1>
                        <p className="lead text-center">Create new book</p>
                        {error && <p className="text-danger">{error}</p>}
                        <form noValidate onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Title of the Book"
                                    name="title"
                                    className="form-control"
                                    value={book.title}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="ISBN"
                                    name="isbn"
                                    className="form-control"
                                    value={book.isbn}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Author"
                                    name="author"
                                    className="form-control"
                                    value={book.author}
                                    onChange={onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;
