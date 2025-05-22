import gamutsLogo from "/gamuts_logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={gamutsLogo} className="logo" alt="Vite logo" />
        </a>
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>Gamuts</h1>
      <p className="read-the-docs">
        A modern, lightweight editor designed to make photo and video editing
        faster, smoother, and more intuitive. Perfect for creators who value
        speed without compromising quality.
      </p>
    </>
  );
}

export default App;
