import React from 'react';
import { BiCopyright } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { BiLogoFirebase } from 'react-icons/bi';
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandTailwind, TbBrandVite } from 'react-icons/tb';
import LightDark from './LightDark';

const Footer = () => {
    const size = 25;

    return (
        <div className='w-full font1 text-sm p-2 rounded-sm text-center mt-5 duration-100 text-slate-950 dark:text-gray-200 dark:bg-black'>
            <span>
                <a href="https://github.com/Erik-Varga" target="_blank" rel="noreferrer">
                    <span className='flex items-center justify-center'>
                        &copy; {(new Date().getFullYear())} Erik Varga | Web Developer
                        &nbsp;<BsGithub />
                    </span>
                </a>
                <a href="https://github.com/Erik-Varga/react-infamous-music-app" target="_blank" rel="noreferrer" className='text-xs'>
                Source Code |&nbsp;
                </a>
            </span>
            <span className='text-xs text-slate-400'>Developed using:  <strong>React &#x2022; Vite &#x2022; JavaScript &#x2022; Tailwind CSS</strong></span>
            <span className='flex justify-center items-center gap-2 text-slate-400'>
                <FaReact size={size} />
                <TbBrandVite size={size} />
                <IoLogoJavascript  size={size} />
                <TbBrandTailwind size={size} />
                <LightDark />
            </span>
        </div>
    )
}

export default Footer