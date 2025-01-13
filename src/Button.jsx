function Button() {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <button className="border-2 bg-purple-200" onClick={handleClick}>
      +
    </button>
  );
}
export default Button;
