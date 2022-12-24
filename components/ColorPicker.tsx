import { useState } from "react";
import { EyeDropperIcon } from '@heroicons/react/20/solid';

export default function ColorPicker(props: any) {
  const colors = ['#2196F3', '#009688', '#9C27B0', '#FFEB3B', '#afbbc9', '#4CAF50', '#2d3748', '#f56565', '#ed64a6'];
  const [isOpen, setIsOpen] = useState(false);
  const [colorSelected, setColorSelected] = useState(props.initialColor);

  function handleChange(newBackgroundColor: string) {
    setColorSelected(newBackgroundColor);
    props.handleChange(newBackgroundColor);
  }

  return (
    <div className="flex items-center ml-4">
      <input 
        id="colorSelected" 
        type="text" 
        placeholder="Pick a color"
        value={colorSelected}
        readOnly
        className="block w-20 h-8 mr-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      <div className="relative">
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-8 h-8 rounded-full items-center focus:outline-none focus:shadow-outline inline-flex p-2 shadow"
          style={{background: `${colorSelected}`, color: 'white'}}
        >
          <EyeDropperIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {isOpen ? 
          <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg">
            <div className="rounded-md bg-white shadow-xs px-4 py-3">
              <div className="flex flex-wrap -mx-2">
                {colors.map((color, index) => 
                  <div key={index} className="px-2">
                    {colorSelected === color ? 
                      <div
                        className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white"
                        style={{background: `${color}`, boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)'}}
                      ></div>  : 
                      <div
                        role="checkbox"
                        tabIndex={0}
                        onClick={() => handleChange(color)}
                        aria-checked={!!colorSelected}
                        className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white focus:outline-none focus:shadow-outline"
                        style={{background: `${color}`}}
                      ></div>}
                    </div>)}
                </div>
              </div>
            </div> : null}
        </div>
      </div>
  );
}