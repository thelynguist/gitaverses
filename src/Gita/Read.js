import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

function Read() {
  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    // const dbRef = ref(db, )
  };
  return (
    <div>
      <button onClick={fetchData}>Display Data</button>
    </div>
  );
}

export default Read;
