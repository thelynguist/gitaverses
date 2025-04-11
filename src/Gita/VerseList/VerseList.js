import { useEffect } from "react";
import DownloadJSON from "../DLButton";
import "../gita.css";
import Input from "../Input/Input.js";
import verse from "../Input/Input.js";
import Verse from "../Verse/Verse";
import verses from "../gita_verses.json";
import verseIDs from "../Gita.js";
import firebase from "firebase/compat/app";
import app from "../../firebaseConfig";
import id from "../Input/Input.js";
import { getDatabase, ref, set, push, get } from "firebase/database";
import {
  deleteDoc,
  orderBy,
  setDoc,
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc,
  getFirestore,
  updateDoc,
  writeBatch,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import React, { useState } from "react";
const db = getFirestore(app);

const data = verses.books[0].chapters;

const chpt1 = data[0].verses;
const chpt2 = data[1].verses;
const chpt3 = data[2].verses;

export default function VerseList({
  chapter,
  verses,
  clearData,
  addToData,
  logData,
  replaceVerse,
  logFullData,
  fullData2,
  logFullData2,
  replaceChapter,
  data,
  id,
}) {
  const [versesArray, setVersesArray] = useState([]);
  const [chapterName, setChapterName] = useState("Chapter 1");
  const db = getFirestore();

  const colRef = collection(db, `${chapterName}`);

  //This function adds entire chapters of json data.
  //Use: If multiple verses are created, you can use this to add them all at once.
  //Be sure to change the data source accordingly. It's connected via dot operator to the forEach function.
  // const addNewChapter = function () {
  //   const db = getFirestore();
  //   chpt3.forEach((document) => {
  //     const docRef = doc(db, "Chapter 3", crypto.randomUUID());
  //     const verse = { ...document, id: crypto.randomUUID() };
  //     setDoc(docRef, verse)
  //       .then(() => console.log("Document Submitted"))
  //       .catch((error) => console.log("Issue submitting: ", error));
  //   });
  // };

  //Official function for fetching data.
  function fetchVerseForEdit() {
    const docRef = doc(db, `Chapter ${chapter}`, id.toString());
    getDoc(docRef)
      .then((doc) => {
        const verseToEdit = doc.data();
        console.log(verseToEdit, `ID: ${doc.id}`);
      })
      .catch((error) => console.log("Error: ", error.message));
  }

  //Get chapter name
  function getChapterName(name) {
    setChapterName(name);
  }
  // useEffect(() => {
  //   console.log(chapterName);
  // });

  //Grabs the data and logs it to the console.
  //It is connected to the "Log Data" button below.
  const fetchData = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, chapterName);
    const querySnapshot = await getDocs(collectionRef);
    const chapterToView = [];

    querySnapshot.forEach((doc) => {
      chapterToView.push({ docID: doc.id, ...doc.data() });
    });
    console.log(chapterToView.sort((a, b) => a.verse - b.verse));
  };

  //Alternative to the fetchData function
  const getChapter = function (e) {
    e.preventDefault();
    const q = query(
      colRef,
      where("sourcename", "==", "Chapter 1"),
      orderBy("verse", "desc")
    );
    // console.log(q);
    onSnapshot(q, (snapshot) => {
      let thisChapter = [];
      snapshot.docs.forEach((doc) => {
        thisChapter.push({ ...doc.data(), id: doc.id });
      });
      console.log(thisChapter);
    });
  };

  return (
    <div id="list-container">
      <div id="box-container">
        <div className="header-container">
          <h2>Recently Translated Verses</h2>
        </div>
        <ul>
          {verses.map((verse) => {
            return (
              <Verse
                verses={verses}
                verse={verse}
                key={verse.id}
                replaceVerse={replaceVerse}
              />
            );
          })}
        </ul>
      </div>
      <div id="button-container">
        <div id="button-top-row">
          <button className="bottom-buttons" onClick={clearData}>
            Clear List of Verses
          </button>
          <button className="bottom-buttons">Add to Chatper</button>
          <button className="bottom-buttons">Replace Full Chapter</button>
          <button className="bottom-buttons" onClick={fetchVerseForEdit}>
            Fetch Verse for Edit
          </button>
        </div>
        <div id="button-bottom-row">
          <DownloadJSON data={verses} fileName="versesUpdate" />
          <button className="bottom-buttons" onClick={logData}>
            Log Chapter
          </button>
          <button className="bottom-buttons" onClick={() => alert("No data")}>
            Export All Data
          </button>
          <form>
            <span>Enter Chapter</span>
            <input onChange={(e) => getChapterName(e.target.value)}></input>
            <button className="bottom-buttons" onClick={fetchData}>
              Log All Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// const addChapter = function () {
//   const dbRef = ref(db, `Chapter ${chapter}`);
//   set(dbRef, verses.books[0].chapters[0].verses)
//     .then(() => console.log("Data Saved"))
//     .catch((error) => {
//       console.log("Error saving data: ", error);
//     });
// };

// const exportAllData = async () => {
//   const db = getDatabase(app);
//   const postedData = push(ref(db, "Bhagavad-Gita"));
//   set(postedData, {
//     sourcename: "Bhagavad-Gita",
//     books: [{ book: "1", chapters: fullData2 }],
//   })
//     .then(() => alert("Data Posted"))
//     .catch((error) => alert("Error: ", error.message));
// };
