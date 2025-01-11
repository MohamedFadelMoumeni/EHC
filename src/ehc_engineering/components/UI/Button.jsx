export function Button({ children, ...props }) {
  return (
    <button
      className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-lg transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}