import React from 'react';
import { Icon } from '@iconify/react';


function Room() {
  return (
    <div className='w-[30%] h-[50px] rounded-md relative'>
        <Icon icon="majesticons:home" fontSize={12} className="flex w-full h-full  bg-slate-200 border border-black rounded-md text-black font-bold py-3 px-4 focus:outline-none focus-visible:outline-none focus:before absolute transform transition duration-200 cursor-pointer" />
    </div>
  )
}

export default Room