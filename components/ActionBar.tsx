import { useContext } from "react";

import ImageContext from "../store/image-context";
import ColorPicker from './ColorPicker';
import SingleSelectPicker from "./SingleSelectPicker";

export default function ActionBar(props: any) {
  // TODO: Enabled this once screenshot issue is fixed.
  // const [showInfo, setShowInfo] = useState(true);
  
  // TODO: Enable once format feature is finished.
  // const formats = ['JPEG', 'PNG'];
  
  const imageCtx = useContext(ImageContext);
  const gridSizes = ['IG Story', 'IG Post'];

  function handleDownload() {
    props.handleDownload();
  }

  function handleGridSizeChange(newGridSize: string) {
    imageCtx.setGridSize(newGridSize);
  }

  function handleBackgroundColorChange(newBackgroundColor: string) {
    imageCtx.setBackgroundColor(newBackgroundColor);
  }

  return (
    <div className="flex w-full my-2 mx-auto justify-between items-center">
      {/* TODO: Enable this once screenshot issue is fixed. */}
      {/* <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            checked={showInfo}
            onChange={() => setShowInfo(!showInfo)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            Show Info
          </label>
        </div>
      </div> */}
      <div className="flex justify-start">
        <SingleSelectPicker options={gridSizes} handleChange={handleGridSizeChange} initialValue="IG Story"/>
        <ColorPicker initialColor={imageCtx.backgroundColor} handleChange={handleBackgroundColorChange}/>
      </div>
      {/* TODO: Enable once format feature is finished. */}
      {/* <SingleSelectPicker options={formats} initialValue="PNG"/> */}
      <button 
        onClick={handleDownload}
        className="inline-flex items-center h-8 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Download
      </button>
    </div> 
  );
}