import Welcome from "./welcome/welcome.js";
import Selection from "./selection/selection.js";
import Gita from "./Gita/gita.js";
import "./App.css";

//import data from "./gita_verses.json";

function App() {
  return (
    <div className="container">
      <Welcome />
      <Selection />
      <Gita />
    </div>
  );
}

export default App;
