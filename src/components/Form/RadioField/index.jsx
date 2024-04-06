/* eslint-disable react/prop-types */

export default function RadioField({ label, name, options, register, error }) {
  return (
    <div className="">
      <label className="block font-bold">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-4 md:flex-row xs:flex-col">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              {...register(name)}
              type="radio"
              value={option}
              id={option}
            />
            <label htmlFor={option} className="ml-2">
              {option}
            </label>
          </div>
        ))}
      </div>
      <p className="text-red-500 text-sm">{error?.message?.split("type")[0]}</p>
    </div>
  );
}
