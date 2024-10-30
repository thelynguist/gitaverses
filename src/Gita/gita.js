import { useState } from "react";
import "./gita.css";
import verses from "./gita_verses.json";
import Input from "./Input/Input";
import VerseList from "./VerseList/VerseList";
//import testingStuff from "../testing";

export default function Gita() {
  const [chapter, setChpt] = useState(0);
  const [data, setData] = useState(
    verses.books[0].chapters[Number(chapter)].verses
  );
  const [tempData, setTempData] = useState([]);
  const [fullData, setFullData] = useState(verses.books[0].chapters);

  //--Set the chapter that is being manipulated--//
  function replaceChapter(newChapter) {
    setFullData((data) =>
      data.map((chapter) =>
        chapter.chapter === Number(newChapter[0].chapter)
          ? (chapter.verses = { chapter: chapter.chapter, verses: newChapter })
          : chapter
      )
    );
  }

  function logFullData() {
    console.log(fullData);
  }
  function logData() {
    console.log(data);
  }

  //--Map through the verse and replace it with the new one--//
  function replaceVerse(newVerse) {
    setData((data) =>
      data.map((item) =>
        Number(item.verse) === newVerse.verse ? (item = newVerse) : item
      )
    );
  }

  function addToData(datum) {
    setData((data) => [...data, ...datum]);
  }

  function addTempData(datum) {
    setTempData((data) => [...data, datum]);
  }

  function clearTempData() {
    setTempData((data) => []);
  }

  function addVerse(verse) {
    setData((data) => [...data, verse]);
  }

  function changeChpt(num) {
    setChpt(num);
    setData(verses.books[0].chapters[num - 1].verses);
  }

  return (
    <div>
      <Input
        verses={data}
        onAddVerse={addVerse}
        chapter={chapter}
        changeChpt={changeChpt}
        addTempData={addTempData}
      />
      <VerseList
        verses={tempData}
        clearData={clearTempData}
        addToData={addToData}
        logData={logData}
        replaceVerse={replaceVerse}
        logFullData={logFullData}
        replaceChapter={replaceChapter}
        data={data}
      />
    </div>
  );
}
