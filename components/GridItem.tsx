import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator, MdRemoveCircle } from 'react-icons/md'

import Icon from './Icon';
import GridItemsContext from "../store/grid-items-context";
import ImageContext from "../store/image-context";

export default function GridItem(props: any) {
  // TODO: Enable once screenshot issue is fixed.
  // const [showInfo, setShowInfo] = useState(false);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({id: props.item.id})
  const gridItemsCtx = useContext(GridItemsContext);
  const imageCtx = useContext(ImageContext);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const itemIsGridItem: any = gridItemsCtx.itemIsGridItem(props.item.id);
  const numAlbums = gridItemsCtx.totalGridItems;

  let gridItemDimensionPixels = '';

  if (imageCtx.gridSize === 'IG Post') {
    gridItemDimensionPixels = calculateIGPostGridItemDimensionPixels();
  } else if (imageCtx.gridSize === 'IG Story') {
    gridItemDimensionPixels = calculateIGStoryGridItemDimensionPixels();
  }

  // Calculates pixel dimensions (height and width) for IG posts.
  function calculateIGPostGridItemDimensionPixels(): string {
    if (numAlbums <= 1) {
      return '40';
    } else if (numAlbums <= 4) {
      return '20';
    } else if (numAlbums <= 12) {
      return '10';
    } else {
      // We shouldn't ever reach this.
      return '8';
    }
  }

  // Calculates pixel dimensions (height and width) for IG stories.
  function calculateIGStoryGridItemDimensionPixels(): string {
    if (numAlbums <= 2) {
      return '40';
    } else if (numAlbums <= 3) {
      return '32';
    } else if (numAlbums <= 4) {
      return '24';
    } else if (numAlbums <= 8) {
      return '20';
    } else if (numAlbums <= 10) {
      return '16';
    } else if (numAlbums <= 12) {
      return '10';
    } else {
      // We shouldn't ever reach this.
      return '8';
    }
  }

  function removeItemFromGridItems() {
    if (!itemIsGridItem) return;
    gridItemsCtx.removeGridItem(props.item.id);
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex flex-col items-center justify-center text-center m-1 w-${gridItemDimensionPixels} cursor-default group group-focus-within:scale-100`}>
      <div className={`relative w-${gridItemDimensionPixels} h-${gridItemDimensionPixels}`}>
        <picture>
          <img 
            alt={props.item.albumTitle}
            src={props.item.imageURL}
            className="border border-slate-300 rounded-sm">
          </img>
        </picture>
        <button 
          className="icon-button icon-button-drag group-hover:scale-100 group-focus:scale-100" 
          ref={setActivatorNodeRef} 
          {...listeners}>
          <Icon icon={<MdDragIndicator size="16" />}></Icon>
        </button>
        <button
          className="icon-button icon-button-remove group-hover:scale-100 group-focus:scale-100" 
          onClick={removeItemFromGridItems}>
          <Icon icon={<MdRemoveCircle size="16" />}></Icon>
        </button>
      </div>
      {/* TODO: Enable once screenshot issue is fixed. */}
      {/* {showInfo && <div className="flex flex-col">
        <div className={`mt-1 text-sm`}>{props.item.albumTitle}</div>
        <div className="truncate text-xs text-red-500">{props.item.artist}</div>
      </div>} */}
    </div>
  );
}