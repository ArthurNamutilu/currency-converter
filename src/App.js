import "./App.css";
import Currency from "./component/Currency";

function App() {
  return (
    <div className="flex flex-col items-center h-screen  bg-orange-200">
      <h1 className="text-3xl font-bold">Currency converter</h1>
      <Currency />
    </div>
  );
}

export default App;
