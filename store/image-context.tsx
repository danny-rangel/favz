import {createContext, useState} from 'react';

interface ImageContextInterface {
  gridSize: string,
  imageType: string,
  backgroundColor: string,
  showInfo: boolean,
  setGridSize: any,
  setImageType: any,
  setBackgroundColor: any,
}

const ImageContext = createContext<ImageContextInterface>({
  gridSize: '',
  imageType: '',
  backgroundColor: '',
  showInfo: false,
  setGridSize: (newGridSize: string) => {},
  setImageType: (newImageType: string) => {},
  setBackgroundColor: (newBackgroundColor: string) => {},
});

export function ImageContextProvider(props: any) {
  const [gridSize, setGridSize] = useState('IG Story');
  const [imageType, setImageType] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#2d3748');
  const [showInfo, setShowInfo] = useState(false);

  function setGridSizeHandler(newGridSize: string) {
    setGridSize(newGridSize);
  }
  
  function setImageTypeHandler(newImageType: string) {
    setImageType(newImageType);
  }

  function setBackgroundColorHandler(newBackgroundColor: string) {
    setBackgroundColor(newBackgroundColor);
  }

  const context = {
    gridSize: gridSize,
    imageType: imageType,
    backgroundColor: backgroundColor,
    showInfo: showInfo,
    setGridSize: setGridSizeHandler,
    setImageType: setImageTypeHandler,
    setBackgroundColor: setBackgroundColorHandler,
  };

  return <ImageContext.Provider value={context}>
    {props.children}
  </ImageContext.Provider>
}

export default ImageContext;