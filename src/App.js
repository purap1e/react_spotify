import SideBar from "./components/sidebar/SideBar";
import './AppStyle.css'
import './components/common/CommonStyle.css'
import Home from "./components/home/Home";

function App() {
  return (
    <div className="wrapper">
        <SideBar/>
        <Home/>
    </div>
  );
}

export default App;
