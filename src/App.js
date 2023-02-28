import "./App.css";
import AppRoute from "./AppRoute";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AppRoute/>
      <ToastContainer theme="dark"/>
    </div>
  );
}

export default App;
