export default function FormButton({ children, ...props }) {
  return (
    <button
      type="submit"
      className="w-full bg-primary text-white font-semibold py-4 rounded-xl hover:bg-primary-dark transition-colors duration-300"
      {...props}
    >
      {children}
    </button>
  );
}