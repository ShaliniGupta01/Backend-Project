import React from "react";
import axios from "axios";
import { useContext } from "react";
import "./FormStyle.css";
import { Data } from "../../Context/WorkoutContext";
import { useAuthContext } from "../../Hooks/useAuthContext";

const Form = () => {
  const { user } = useAuthContext();

  const {
    form,
    setForm,
    workouts,
    setWorkouts,
    getWorkouts,
    updateForm,
    setUpdateForm,
  } = useContext(Data);

  //CREATE FORM FUNCTION
  const updateFormField = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const createWorkout = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:4000/api/workouts",
      form,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setWorkouts([...workouts, response.data]);
    setForm({ title: "", reps: "", load: "" }); // clear form after submit

    getWorkouts();
  };

  //UPDATE FORM  FUNCTION
  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const updateWorkout = async (e) => {
    e.preventDefault();
    const { _id, title, reps, load } = updateForm;

    await axios.patch(
      `http://localhost:4000/api/workouts/${_id}`,
      {
        title,
        reps,
        load,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    getWorkouts();
    setUpdateForm({
      _id: null,
      title: "",
      reps: "",
      load: "",
    });
  };

  return (
    <>
      {/* //CREATE Form */}
      {!updateForm._id && (
        <div className="form">
          <h1>Create Record</h1>
          <form onSubmit={createWorkout}>
            <div className="field">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={updateFormField}
                required
              />
            </div>

            <div className="field">
              <label>Reps:</label>
              <input
                type="tel"
                name="reps"
                value={form.reps}
                onChange={updateFormField}
                required
              />
            </div>

            <div className="field">
              <label>Load(in kg):</label>
              <input
                type="tel"
                name="load"
                value={form.load}
                onChange={updateFormField}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* //UPDATE Form */}

      {updateForm._id && (
        <div className="form">
          <h1>Edit Record</h1>
          <form onSubmit={updateWorkout}>
            {" "}
            <div className="field">
              <label>Title:</label>{" "}
              <input
                type="text"
                name="title"
                value={updateForm.title}
                onChange={handleUpdateFieldChange}
              />
            </div>{" "}
            <div className="field">
              <label>Reps:</label>{" "}
              <input
                type="tel"
                name="reps"
                value={updateForm.reps}
                onChange={handleUpdateFieldChange}
              />
            </div>{" "}
            <div className="field">
              <label>Load (in kg):</label>{" "}
              <input
                type="tel"
                name="load"
                value={updateForm.load}
                onChange={handleUpdateFieldChange}
              />
            </div>{" "}
            <button type="submit">Update</button>{" "}
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
