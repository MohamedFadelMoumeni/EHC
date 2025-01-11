export default function FormInput({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors"
        {...props}
      />
    </div>
  );
}