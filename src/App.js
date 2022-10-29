import Notes from "./components/Notes/Notes";
import './App.css'
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <h3 className="border-bottom">Notes</h3>
        <Notes />
      </div>
    </>
  );
}

export default App;
