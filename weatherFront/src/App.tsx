import ReactDOM from 'react-dom/client';

// Define the props and state interfaces (if needed)

// Use a functional component with TypeScript
function City() {
  return (
    <form>
      <label>Enter city name:
        <input type="text" />
      </label>
    </form>
  );
}

// Create a root and render the component
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<City />);

}
export default City;
