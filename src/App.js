import Navbar from "./components/Navbar/Navbar";
import AlbumList from "./components/AlbumList/AlbumList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <AlbumList />
    </div>
  );
}

export default App;
