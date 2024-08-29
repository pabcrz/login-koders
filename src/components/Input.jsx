/* eslint-disable react/prop-types */
export default function Input(props) {
  const { errors, type, placeholder, text } = props;
  return (
    <>
      <label className="flex justify-between">
        {text}:
        {errors && (
          <span className=" text-red-400 text-sm font-semibold">
            {errors?.message}
          </span>
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="focus:outline-none rounded p-1 px-2 bg-slate-700 mb-2"
      />
    </>
  );
}
