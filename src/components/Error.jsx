
// This component displays an error message if one is provided.
export default function Error({ message }) {
  if (!message) return null;
  return (
    <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
      <p>Error: {message}</p>
    </div>
  );
}
