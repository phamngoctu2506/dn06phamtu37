import logo from './logo.svg';
import './App.css';
import './css/style.css'
import ThongTinSV from './Component/ThongTinSV';
import QLDSSV from './Component/QLDSSV';

function App() {
  return (
    <div className="container">
      <ThongTinSV />
      <QLDSSV />
    </div>
  );
}

export default App;