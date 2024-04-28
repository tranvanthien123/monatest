import React from "react";
const Skeleton = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col border border-gray-300 shadow-lg rounded-md p-6 w-full max-w-2xl">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-8 bg-slate-200 rounded col-span-1"></div>
              <div className="h-8 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-8 bg-slate-200 rounded col-span-1"></div>
              <div className="h-8 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-8 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-8 bg-slate-200 rounded"></div>
            <div className="h-8 bg-slate-200 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-8 bg-slate-200 rounded col-span-2"></div>
              <div className="h-8 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-8 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-8 bg-slate-200 rounded"></div>
              <div className="h-8 bg-slate-200 rounded"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
            </div>
            <div className="h-8 bg-slate-200 rounded col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Skeleton);
