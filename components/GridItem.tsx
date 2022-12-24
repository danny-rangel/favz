import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator, MdRemoveCircle } from 'react-icons/md'

import Icon from './Icon';
import GridItemsContext from "../store/grid-items-context";

export default function GridItem(props: any) {
  // TODO: Enable once screenshot issue is fixed.
  // const [showInfo, setShowInfo] = useState(false);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition} = useSortable({id: props.item.id})
  const gridItemsCtx = useContext(GridItemsContext);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const itemIsGridItem: any = gridItemsCtx.itemIsGridItem(props.item.id);
  
  const numAlbums = gridItemsCtx.totalGridItems;
  let instaStoryContainerStyles = '';
  let instaStoryAlbumStyles = '';

  if (numAlbums <= 2) {
    instaStoryContainerStyles = 'w-40';
    instaStoryAlbumStyles = 'w-40 h-40';
  } else if (numAlbums <= 3) {
    instaStoryContainerStyles = 'w-32';
    instaStoryAlbumStyles = 'w-32 h-32';
  } else if (numAlbums <= 4) {
    instaStoryContainerStyles = 'w-24';
    instaStoryAlbumStyles = 'w-24 h-24';
  } else if (numAlbums <= 8) {
    instaStoryContainerStyles = 'w-20';
    instaStoryAlbumStyles = 'w-20 h-20';
  } else if (numAlbums <= 10) {
    instaStoryContainerStyles = 'w-16';
    instaStoryAlbumStyles = 'w-16 h-16';
  } else {
    // We shouldn't ever reach this.
    instaStoryContainerStyles = 'w-10';
    instaStoryAlbumStyles = 'w-10 h-10';
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
      className={`flex flex-col items-center justify-center text-center m-1 ${instaStoryContainerStyles} cursor-default group group-focus-within:scale-100`}>
      <div className={`relative ${instaStoryAlbumStyles}`}>
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