import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { display } from '../../Utils/utils';
import { newTask } from "../../../redux/actions/taskActions";
import Loader from '../../Utils/Loader/Loader'

const NewTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, loading, sucess, task } = useSelector(
        (state) => state.newTask
    );

    const [title, setTitle] = useState("");
    const [social, setSocial] = useState("instagram");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const onSubmitClick = (e) => {
        e.preventDefault();

        dispatch(newTask({ title, social, description, deadline }));

        if (task) {
            display("Task Created Sucessfully");
            if (task && task._id) {
                navigate(`/task/${task._id}`);
            }
        }
    };

    useEffect(() => {
        if (error) {
            display(error, "error");
            dispatch(clearErrors());
        }

        if (sucess) {
            display(sucess, "success");
        }
    }, [dispatch, error, sucess, navigate]);

    if(loading) return <Loader />;

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="breadcrumbs-content">
                                <h1 className="page-title">All Tasks</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account-login section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                            <div className="register-form">
                                <div className="title">
                                    <h3>Add Tasks</h3>
                                    <p>
                                        Provide details below to create a new task
                                    </p>
                                </div>
                                <form id="taskForm" className="row" onSubmit={onSubmitClick}>
                                    <div className="col-15">
                                        <div className="form-group">
                                            <label htmlFor="reg-fn">Task Title</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="reg-fn"
                                                name="title"
                                                required
                                                value={title}
                                                onChange={(e) => { setTitle(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-15">
                                        <div className="form-group">
                                            <label htmlFor="reg-fn">Social Platform</label>
                                            <select
                                                className="form-control"
                                                type="text"
                                                id="social"
                                                name="social"
                                                value="instagram"
                                                required
                                                onChange={(e) => { setSocial(e.target.value) }}
                                            >
                                                <option value="instagram">Instagram</option>
                                                <option value="whatsapp">WhatsApp</option>
                                                <option value="telegram">Telegram</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-15">
                                        <div className="form-group">
                                            <label htmlFor="reg-fn">Description</label>
                                            <textarea
                                                rows="50"
                                                className="form-control"
                                                type="text"
                                                id="reg-fn"
                                                name="description"
                                                required
                                                value={description}
                                                onChange={(e) => { setDescription(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-15">
                                        <div className="form-group">
                                            <label htmlFor="reg-fn">Deadline</label>
                                            <input
                                                className="form-control"
                                                type="date"
                                                id="reg-fn"
                                                name="deadline"
                                                required
                                                value={deadline}
                                                onChange={(e) => { setDeadline(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="button">
                                        <button className="btn" type="submit">
                                            Create Task
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewTask
