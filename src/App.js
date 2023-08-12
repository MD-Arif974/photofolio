
import Navbar from './components/Navbar/Navbar';
import AlbumList from './components/AlbumList/AlbumList';
import { useRef, useState} from 'react';



function App() {
  
  return (
    <div className="App">
        <Navbar />
        <AlbumList />
    </div>
  );
}

export default App;
