
// Loader component for displaying a loading spinner
export default function Loader() {
  return (
    <div className="flex justify-center my-6" role="status" aria-label="Loading">
      <div
        className="
          animate-spin rounded-full h-8 w-8 border-4 border-blue-500
          border-t-transparent
        "
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
