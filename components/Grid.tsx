import { useRef, useContext } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { toPng } from 'html-to-image';

import { PhoneFrame } from "./PhoneFrame";
import GridItem from "./GridItem";
import ActionBar from "./ActionBar";
import GridItemsContext from "../store/grid-items-context";
import ImageContext from "../store/image-context";

export default function Grid() {
  const gridRef = useRef(null);
  const gridItemsCtx = useContext(GridItemsContext);
  const imageCtx = useContext(ImageContext);

  function handleDragEnd(event: any) {
    gridItemsCtx.moveGridItems(event);
  }

  function handleDownload() {
    if (gridRef.current === null) return;
    toPng(gridRef.current, { canvasWidth: 1080, canvasHeight: 1920, quality: 1.0 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'favz'
        link.href = dataUrl
        link.click()
      });
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex w-full mt-2 px-2 flex-col">
        <ActionBar handleDownload={handleDownload} />
        <PhoneFrame className="relative mx-auto w-full max-w-[270px]" backgroundColor={imageCtx.backgroundColor}>
          <SortableContext
            items={gridItemsCtx.gridItems}
            strategy={rectSortingStrategy}>
            <div className="flex items-center justify-center mt-2">
              <div
                ref={gridRef}
                className={`flex flex-wrap ${imageCtx.gridSize === 'IG Story' ? 'insta-story' : 'insta-post'} justify-center content-center`}
                style={{ backgroundColor: imageCtx.backgroundColor }}
              >
                {gridItemsCtx.totalGridItems !== 0 && gridItemsCtx.gridItems.map((e: any) => <GridItem key={e.id} item={e} />)}
              </div>
            </div>
          </SortableContext>
        </PhoneFrame>
      </div>
    </DndContext>
  );
}