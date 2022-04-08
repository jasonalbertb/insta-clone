import React, { useState } from 'react'
import {BsGrid3X3} from "react-icons/bs";
import {ImCheckboxUnchecked} from "react-icons/im";
import {HiOutlineSave} from "react-icons/hi";
import {BiPhotoAlbum} from "react-icons/bi";

import {Grid} from "./Grid";
import {Continuous} from "./Continuous";

export const PhotoTabs = ({postIds}) => {
  const [openedTab, setOpenedTab] = useState(2);

  const TABS = {
    FIRST: 1,
    SEC: 2,
    THIRD: 3,
    FOURTH: 4
  }

  return (
    <>
        <div className='border-b border-gray-300 text-gray-500 text-2xl flex justify-around py-3' >
          <button onClick={()=>setOpenedTab(1)}>
            <BsGrid3X3 className={`${openedTab===TABS.FIRST && "text-blue-500"}`}/>
          </button>
          <button onClick={()=>setOpenedTab(2)}>
            <ImCheckboxUnchecked  className={`${openedTab===TABS.SEC && "text-blue-500"}`}/>
          </button>
          <button onClick={()=>setOpenedTab(3)}>
            <HiOutlineSave className={`${openedTab===TABS.THIRD && "text-blue-500"}`}/>
          </button>
          <button onClick={()=>setOpenedTab(4)}>
            <BiPhotoAlbum className={`${openedTab===TABS.FOURTH && "text-blue-500"}`}/>
          </button>
        </div>
        <ul>
          <li className={`${openedTab === TABS.FIRST? "block":"hidden"}`}>
            <Grid postIds={postIds} />
          </li>
          <li className={`${openedTab === TABS.SEC? "block":"hidden"}`}>
            <Continuous postIds={postIds}/>
          </li>
          <li className={`${openedTab === TABS.THIRD? "block":"hidden"}`}>
            3
          </li>
          <li className={`${openedTab === TABS.FOURTH? "block":"hidden"}`}>
            4
          </li>
        </ul>
    </>
  )
}
