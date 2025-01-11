export default function FormTextArea({ label, rows = 4, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors resize-none"
        {...props}
      />
    </div>
  );
}