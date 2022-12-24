import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineAddCircle } from 'react-icons/md'

import Image from "next/image";
import Icon from './Icon';
import GridItemsContext from "../store/grid-items-context";

export default function SearchResult(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition} = useSortable({id: props.result.id})
  const gridItemsCtx = useContext(GridItemsContext);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const itemIsGridItem: any = gridItemsCtx.itemIsGridItem(props.result.id);

  function addItemToGridItems() {
    if (itemIsGridItem || gridItemsCtx.totalGridItems === 10) return;
    gridItemsCtx.addGridItem({
      id: props.result.id, 
      albumTitle: props.result.albumTitle, 
      artist: props.result.artist, 
      imageURL: props.result.imageURL,
    });
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center text-center m-1 w-20 group cursor-default">
      <div className="relative w-20 h-20">
        <Image
          alt={props.result.albumTitle} 
          src={props.result.imageURL}
          placeholder="blur"
          blurDataURL="/square.png"
          loading="lazy"
          fill={true}
          className="border border-slate-300 rounded-sm">
        </Image>
        {!itemIsGridItem ? <button 
          className="icon-button icon-button-add"
          onClick={addItemToGridItems}>
            <Icon icon={<MdOutlineAddCircle size="16" />}></Icon>
        </button> : null}
      </div>
      <div className="flex flex-col w-full font-sans">
        <div className="mt-1 truncate text-sm text-white">{props.result.albumTitle}</div>
        <div className="truncate text-xs text-gray-300">{props.result.artist}</div>
      </div>
    </div>
  );
}