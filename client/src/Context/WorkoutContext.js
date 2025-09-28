import React, { createContext, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

export const Data = createContext();

const WorkoutContext = ({ children }) => {
  const { user } = useAuthContext();

  // GET Request State
  const [workouts, setWorkouts] = useState(null);

  //  GET Request function with user check
  const getWorkouts = async () => {
    if (!user) return; // stop if no logged-in user
    try {
      const response = await axios.get("http://localhost:4000/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // POST Request State
  const [form, setForm] = useState({
    title: "",
    reps: "",
    load: "",
  });

  //  DELETE Request function with user check
  const deleteWorkout = async (_id) => {
    if (!user) return; // stop if no logged-in user
    try {
      await axios.delete(`http://localhost:4000/api/workouts/${_id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      getWorkouts(); // refresh after delete
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  // UPDATE Request State
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    reps: "",
    load: "",
  });

  const toggleUpdate = (item) => {
    setUpdateForm({
      _id: item._id,
      title: item.title,
      reps: item.reps,
      load: item.load,
    });
  };

  return (
    <Data.Provider
      value={{
        workouts,
        getWorkouts,
        setWorkouts,
        form,
        setForm,
        deleteWorkout,
        updateForm,
        setUpdateForm,
        toggleUpdate,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default WorkoutContext;








