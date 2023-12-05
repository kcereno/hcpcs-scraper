import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center flex-col gap-4">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="text-center text-blue-500">Loading...</p>
    </div>
  );
}
