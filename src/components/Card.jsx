import React, { useEffect, useRef, useState } from 'react'
import { MdExpandMore, MdExpandLess, MdPause, MdPlayArrow, MdQueueMusic, MdRepeat, MdRepeatOne, MdShuffle, MdSkipNext, MdSkipPrevious, MdVolumeOff, MdVolumeUp, MdClose } from 'react-icons/md'
import MusicData from '../assets/data';
import { timer } from '../utils/Timer';

const rotateDirection = ["animate-spin-slow", "animate-reverse-spin"];
const random = Math.floor(Math.random() * rotateDirection.length);
const rand = rotateDirection[random];

const Card = ({props: { musicNumber, setMusicNumber, open, setOpen }}) => {
    const size = 30;

    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(100);
    const [repeat, setRepeat] = useState('repeat');  
    const [mute, setMute] = useState(false);
    const [showBand, setShowBand] = useState(false);

    const [randomDirection, setRandomDirection] = useState("");

    useEffect(() => {
        setRandomDirection(rand);
    }, [])

    const audioRef = useRef();

    function handleLoadStart(e) {
        const src = e.nativeEvent.srcElement.src;
        const audio = new Audio(src);

        audio.onloadedmetadata = function() {
            if (audio.readyState > 0) {
                setDuration(audio.duration);
            };
            
            if (play) {
                audioRef.current.play();
            };
        }
    };

    function handleAudioPlaying() {
        if (play) {
            setPlay(false);
            audioRef.current.pause();
        } else {
            setPlay(true);
            audioRef.current.play();
        }
    };

    function handleTimeUpdate () {
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime);
    };

    function changeCurrentTime(e) {
        const currentTime = Number(e.target.value);
        audioRef.current.currentTime = currentTime;
        setCurrentTime(currentTime);
    };

    function handleNextPrev(n) {
        setMusicNumber(value => {
            if (n > 0) 
                return value + n > MusicData.length - 1 ? 0 : value + n;

            return value + n < 0 ? MusicData.length - 1 : value + n;
        })
    };

    useEffect(() => {
        audioRef.current.volume = volume / 100; // 0 - 1
    }, [volume]);

    function handleRepeat() {
        setRepeat(value => {
            switch (value) {
                case 'repeat':
                    return 'repeat_one';
                case 'repeat_one':
                    return 'shuffle';
                case 'shuffle':
                    return 'repeat';
                default:
                    return 'repeat';
            }
        });
    };

    function handleMute() {
        if (mute) {
            setMute(prev => !prev);
            setVolume(100);
        } else {
            setMute(prev => !prev);
            setVolume(0);
        };
    };

    function handleShowBand() {
            setShowBand(!showBand);
    };

    function EndedAudio() {
        console.log('ended audio')
        switch (repeat) {
            case 'repeat':
                return handleNextPrev(1);
            
            case 'repeat_one':
                return audioRef.current.play();

            case 'shuffle':
                return handleShuffle();

            default:
                return handleNextPrev(1);
        };
    };

    function handleShuffle() {
        const num = randomNumber();
        setMusicNumber(num);
    };

    function randomNumber() {
        const number = Math.floor(Math.random() * (MusicData.length - 1));
        if (number === musicNumber) {
            return randomNumber();
        };
        return number;
    };

    const Duration = ({music}) => {
        const [duration, setDuration] = useState(0);

        useEffect(() => {
            const audio = new Audio(music.src)
            audio.onloadedmetadata = function() {
                if (audio.readyState > 0) {
                    setDuration(audio.duration)
                }
            }
        }, [music]);

        return(
            <span className='duration'>{timer}</span>
        )
    }

  return (
    <div className='card font3 bg-gradient-to-r from-gray-200 to-white dark:from-slate-900 dark:to-gray-700 w-[360px]'>    

        {/* top menu */}
        <div className="nav flex justify-between items-center gap-2 p-3">
            <span className='text-sm'>Now Playing:&nbsp;  {musicNumber + 1} / {MusicData.length}</span>
            <MdQueueMusic size={size} onClick={() => setOpen(prev => !prev)} className='cursor-pointer hover:text-white hover:bg-gray-600 transition-all duration-50' />
        </div>

        {/* image */}
        {!open && 
            <div className="w-full img flex justify-center animate-fade-in-down py-2 h-[300px]">
                <img src={MusicData[musicNumber].thumbnail} alt="" className={`object-cover rounded-full ${rand}`} />
            </div>
        }

        {/* track list */}
        {open && <div>
            <div className='w-full  max-w-[360px] bg-gray-300 dark:bg-gray-800 text-gray-950 dark:text-white shadow-md transition-all delay-1000 relative duration-1000 ease-in-out z-50 mb-7'>
                <div className="header w-full p-1 flex justify-end items-center">
                    <MdClose size={size} onClick={() => setOpen(false)} className='cursor-pointer hover:text-slate-900 hover:bg-gray-100' />
                </div>

                <ul className='w-auto '>
                    {
                        MusicData.map((music, index) => (
                            <li 
                                key={music.id} 
                                onClick={() => setMusicNumber(index)}
                                className={`text-sm w-full p-2 flex justify-between cursor-pointer border-b border-b-gray-200 hover:bg-gray-400 ${musicNumber === index ? 'playing' : ''}`}>
                                <div className="row flex justify-between">
                                    <span>{music.title} - {music.artist}</span>
                                </div>
                                    <span>{music.time}</span>
                                {/* <Duration music={music} /> */}
                                
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>}

        {/* details */}
        <div className="details ">
            <p className="title text-2xl">{MusicData[musicNumber].title}</p>
            <p className="artist text-gray-800 dark:text-gray-400">{MusicData[musicNumber].artist}</p>
        </div>

        {/* progress bar */}
        <div className="progress w-full mt-4 px-3">
            <input 
                type="range" 
                min={0} 
                max={duration} 
                value={currentTime} 
                onChange={e => changeCurrentTime(e)}
                className='h-5 w-full' 
            />
        </div>

        {/* timer */}
        <div className="timer flex justify-between text-sm px-3">
            <span>{timer(currentTime)}</span>
            <span>{timer(duration)}</span>
        </div>

        {/* controls */}
        <div className="controls flex flex-col justify-center items-center gap-2 my-1">
            <div className='flex items-center justify-center gap-2'>
                
                {/* play mode button */}
                <div className={`cursor-pointer border border-transparent hover:border-black dark:hover:border-white`}>
                    {repeat === 'repeat' && <MdRepeat size={size * 1.4} onClick={handleRepeat} title='repeat all' /> }
                    {repeat === 'repeat_one' && <MdRepeatOne size={size * 1.4} onClick={handleRepeat} title='repeat one' />}
                    {repeat === 'shuffle' && <MdShuffle size={size * 1.4} onClick={handleRepeat} title='shuffle' />}
                </div>
                
                {/* prev button */}
                <div>
                    <MdSkipPrevious 
                        size={size * 1.5} 
                        id='prev' 
                        onClick={() => handleNextPrev(-1)}
                        title='Previous'
                        className='cursor-pointer border border-transparent hover:border-black dark:hover:border-white'
                    />
                </div>
                
                {/* play button */}
                <div 
                    className="cursor-pointer w-[80px] h-auto"
                    >
                    {play ? <button onClick={handleAudioPlaying} className='p-2 dark:hover:bg-black'>
                        PAUSE
                    </button> : <button onClick={handleAudioPlaying} className='p-2 dark:hover:bg-black'>
                        PLAY
                    </button>}

                </div>

                {/* next button */}
                <div>
                    <MdSkipNext 
                        size={size * 1.5} 
                        id='next' 
                        onClick={() => handleNextPrev(1)}
                        title='Next'
                        className='cursor-pointer border border-transparent hover:border-black dark:hover:border-white'
                    />
                </div>

                {/* mute button                */}
                <div className={`cursor-pointer border border-transparent hover:border-black dark:hover:border-white`}>
                    {!mute && <MdVolumeUp size={size * 1.4} onClick={handleMute} title='mute' /> }
                    {mute && <MdVolumeOff size={size * 1.4} onClick={handleMute} title='unmute' />}
                </div>
            </div>

            {/* display play mode */}
            <div className="flex gap-1 text-sm dark:text-green-500 mt-1">
                Mode:
                {repeat === 'repeat' && <div>Repeat All</div> }
                {repeat === 'repeat_one' && <div>Repeat One</div> }
                {repeat === 'shuffle' && <div>Shuffle</div> }
            </div> 
        </div>

        {/* audio */}
        <audio 
            src={MusicData[musicNumber].src} 
            hidden 
            ref={audioRef} 
            onLoadStart={handleLoadStart} 
            onTimeUpdate={handleTimeUpdate}
            onEnded={EndedAudio}
        />

        {/* credits */}
        <div className='text-sm flex items-center justify-center gap-2'>
            &copy; Music by Darin Bridges
            {showBand ? 
            <MdExpandLess size={size} onClick={() => handleShowBand()} />
            :
            <MdExpandMore size={size} onClick={() => handleShowBand()} />
            }
        </div>
        {showBand && <div className='text-sm dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-800 rounded p-2'>
            <p>Infamy:</p>    
            <p>Darin Bridges (guitar, bass, vocals)</p>    
            <p>Jeff Dentler (guitar)</p>    
            <p>Erik Varga (drums)</p>    
            <p>Recorded 1993 in Longwood, FL USA</p>    
        </div>}
    </div>
  )
}

export default Card