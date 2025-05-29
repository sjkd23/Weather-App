function Error({ message }) {
  return (
    <p className="text-red-500 font-medium mt-2 transition-opacity duration-300 opacity-100">
      Error: {message}
    </p>
  );
}

export default Error;
