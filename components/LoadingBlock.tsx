export default function LoadingBlock() {
  return (
    <div className="flex flex-col items-center m-1">
      <div className="w-20 h-20 animate-pulse border rounded-sm">
        <div className="bg-slate-700 h-full w-full"></div>
      </div>
      <div className="flex flex-col animate-pulse w-full mt-1">
        <div className="h-3 mt-1 w-full mx-auto bg-slate-700 rounded"></div>
        <div className="mx-auto h-[10px] mt-1 mb-[3px] w-4/5 bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};