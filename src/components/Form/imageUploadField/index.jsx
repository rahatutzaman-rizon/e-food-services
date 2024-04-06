/* eslint-disable react/prop-types */

export default function ImageUploadField({ label, name, register, error }) {
  return (
    <div className="mb-3">
      <label className="block font-bold my-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        {...register(name)}
        type="file"
        className="border-[1px] border-[#aaa] p-2 lg:w-[390px] md:w-[350px] sm:w-[300px] rounded-lg bg-[#FFF7E9]"
      />
      <p className="text-red-500 text-sm">{error?.message?.split(",")[0]}</p>
    </div>
  );
}
