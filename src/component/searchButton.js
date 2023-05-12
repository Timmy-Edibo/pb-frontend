import React from 'react';

function SearchButton(props) {
  return (
    <div className="">
      <input
        type="text"
        className="w-full h-12 px-4 pr-12 text-gray-700 placeholder-gray-500 font-semibold bg-white border border-gray-400 rounded shadow-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
        onChange={props.onChange}
        value={props.value}
        onClick={props.onClick}
        placeholder="Search for contact by lastname..."
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    </div>
  );
}

export default SearchButton;
