export default function SuccessMessage({ message, onClose }) {
  return (
    <div className="bg-green-50 p-8 rounded-2xl text-center">
      <div className="mb-4 text-green-600">
        <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-green-800 mb-4">Merci !</h3>
      <p className="text-green-700 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors"
      >
        Fermer
      </button>
    </div>
  );
}