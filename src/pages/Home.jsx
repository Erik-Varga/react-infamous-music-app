import React, { useState } from 'react'
import Card from '../components/Card'

const Home = () => {
    const [musicNumber, setMusicNumber] = useState(0);
    const [open, setOpen] = useState(false);

  return (
    <div className='w-full flex flex-col justify-center items-center text-base md:mt-5'>
      <span className='font2 text-6xl font-bold text-slate-800 dark:text-slate-600'>INFAMY</span>
      <div className="mt-1">
        <div className='font2 text-2xl'>ROMANCE DEMO 1993</div>
      </div>
      <div>
        <Card props={{ musicNumber, setMusicNumber, open, setOpen }} />
      </div>

    </div>
  )
}

export default Home