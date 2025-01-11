export default function FormSelect({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <select 
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-primary focus:outline-none transition-colors bg-white"
        {...props}
      >
        <option value="">Sélectionnez une option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}