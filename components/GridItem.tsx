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

  let containerDimensionPixels = '';
  let albumDimensionPixels = '';

  if (imageCtx.gridSize === 'IG Post') {
    if (numAlbums <= 1) {
      containerDimensionPixels = 'w-40';
      albumDimensionPixels = 'w-40 h-40';
    } else if (numAlbums <= 2) {
      containerDimensionPixels = 'w-[5.5rem]';
      albumDimensionPixels = 'w-[5.5rem] h-[5.5rem]';
    } else if (numAlbums <= 4) {
      containerDimensionPixels = 'w-20';
      albumDimensionPixels = 'w-20 h-20';
    } else if (numAlbums <= 9) {
      containerDimensionPixels = 'w-14';
      albumDimensionPixels = 'w-14 h-14';
    } else if (numAlbums <= 12) {
      containerDimensionPixels = 'w-10';
      albumDimensionPixels = 'w-10 h-10';
    } else {
      // We shouldn't ever reach this.
      containerDimensionPixels = 'w-8';
      albumDimensionPixels = 'w-8 h-8';
    }
  } else if (imageCtx.gridSize === 'IG Story') {
    if (numAlbums <= 2) {
      containerDimensionPixels = 'w-40';
      albumDimensionPixels = 'w-40 h-40';
    } else if (numAlbums <= 3) {
      containerDimensionPixels = 'w-[6.5rem]';
      albumDimensionPixels = 'w-[6.5rem] h-[6.5rem]';
    } else if (numAlbums <= 6) {
      containerDimensionPixels = 'w-[5.5rem]';
      albumDimensionPixels = 'w-[5.5rem] h-[5.5rem]';
    } else if (numAlbums <= 8) {
      containerDimensionPixels = 'w-20';
      albumDimensionPixels = 'w-20 h-20';
    } else if (numAlbums <= 12) {
      containerDimensionPixels = 'w-14';
      albumDimensionPixels = 'w-14 h-14';
    } else {
      // We shouldn't ever reach this.
      containerDimensionPixels = 'w-10';
      albumDimensionPixels = 'w-10 h-10';
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
      className={`flex flex-col items-center justify-center text-center m-1 ${containerDimensionPixels} cursor-default group group-focus-within:scale-100`}>
      <div className={`relative ${albumDimensionPixels}`}>
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