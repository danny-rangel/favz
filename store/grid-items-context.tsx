import { arrayMove } from '@dnd-kit/sortable';
import { createContext, useState } from 'react';

interface GridItemsContextInterface {
  gridItems: GridItem[],
  totalGridItems: number,
  addGridItem: any,
  removeGridItem: any,
  moveGridItems: any,
  itemIsGridItem: any,
}

interface GridItem {
  id: string, 
  albumTitle: string, 
  artist: string, 
  imageURL: string,
}

const GridItemsContext = createContext<GridItemsContextInterface>({
  gridItems: [],
  totalGridItems: 0,
  addGridItem: (newGridItem: any) => {},
  removeGridItem: (gridItemId: any) => {},
  moveGridItems: (event: any) => {},
  itemIsGridItem: (gridItemId: any) => {},
});

export function GridItemsContextProvider(props: any) {
  const [gridItems, setGridItems] = useState<GridItem[]>([])

  function addGridItemHandler(newGridItem: any) {
    setGridItems((prevGridItems) => {
      return prevGridItems.concat(newGridItem);
    })
  }

  function removeGridItemHandler(gridItemId: any) {
    setGridItems(prevGridItems => {
      return prevGridItems.filter((gridItem: any) => gridItem.id !== gridItemId);
    })
  }

  function moveGridItemsHandler(event: any) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setGridItems(prevGridItems => {
        const activeIndex = prevGridItems.findIndex(e => e.id === active.id);
        const overIndex = prevGridItems.findIndex(e => e.id === over.id);

        return arrayMove(prevGridItems, activeIndex, overIndex);
      })
    }
  }

  function itemIsGridItemHandler(gridItemId: any) {
    return gridItems.some((gridItem: any) => gridItem.id === gridItemId);
  }

  const context = {
    gridItems: gridItems,
    totalGridItems: gridItems.length,
    addGridItem: addGridItemHandler,
    removeGridItem: removeGridItemHandler,
    moveGridItems: moveGridItemsHandler,
    itemIsGridItem: itemIsGridItemHandler,
  };

  return <GridItemsContext.Provider value={context}>
    {props.children}
  </GridItemsContext.Provider>
}

export default GridItemsContext;