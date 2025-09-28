import { useEffect, useContext } from "react";
import { Data } from "../../Context/WorkoutContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import "./RecordStyle.css";

const Records = () => {
  const { user } = useAuthContext();

  // Context API
  const { workouts, getWorkouts, deleteWorkout, toggleUpdate } =
    useContext(Data);

  useEffect(() => {
    if (user) {
      getWorkouts();
    }
  }, [user, getWorkouts]);

  return (
    <div className="records">
      {workouts &&
        workouts.map((item) => (
          <div className="record" key={item._id}>
            <h1>{item.title}</h1>
            <p>Reps: {item.reps}</p>
            <p>Load (in kg): {item.load}</p>
            <div className="btns">
              <img
                src={editIcon}
                onClick={() => toggleUpdate(item)}
                alt="edit"
              />
              <img
                src={deleteIcon}
                onClick={() => deleteWorkout(item._id)}
                alt="delete"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Records;
