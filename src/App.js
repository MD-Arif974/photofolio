import {db} from './firebaseInit';
import Navbar from './components/Navbar/Navbar';
import AlbumList from './components/AlbumList/AlbumList';

function App() {
  return (
    <div className="App">
        <Navbar />
        <AlbumList />
    </div>
  );
}

export default App;
