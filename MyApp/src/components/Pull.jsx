export default function Pull() {
  return (
    <a href="http://localhost:3001/tweets">
      {/* Add an click event listener that will trigger an axios call to /tweets then when the data is back will be rendered */}
      <button> Pull</button>
    </a>
  );
}
