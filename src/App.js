import "./App.css";
import Currency from "./component/Currency";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-200 p-4">
      <h1 className="text-3xl font-bold mb-4">Currency converter</h1>
      <div className="w-full sm:w-auto">
        <Currency />
      </div>
    </div>
  );
}

export default App;

// import "./App.css";
// import Currency from "./component/Currency";

// function App() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen  bg-orange-200">
//       <h1 className="text-3xl font-bold">Currency converter</h1>
//       <Currency />
//     </div>
//   );
// }

// export default App;
