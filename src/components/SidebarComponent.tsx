import './global.css'
import { FaLinkedin, FaGithub, FaHome } from 'react-icons/fa';
import Link from 'next/link'
import { RefObject } from 'scrollex/dist/utils';

const SidebarComponent:React.FC<{home:RefObject<HTMLElement>}> = (dto) => {
    return (
    <aside className="absolute inset-y-0 left-0 z-10 bg-[#97C145] w-1.5 hover:w-12 transition-all duration-300 flex flex-col items-center justify-center group">
        <FaHome className="text-white text-3xl cursor-pointer hover:text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={()=>{dto.home.current?.scrollIntoView({behavior:'smooth'})}}
        />
        <Link href="https://www.linkedin.com/in/heming-zhu-735890266/" target="_blank" passHref className='p-4'>
            <FaLinkedin className="text-white text-3xl cursor-pointer hover:text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <Link href="https://github.com/Roventta" target="_blank" passHref>
            <FaGithub className="text-white text-3xl cursor-pointer hover:text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

    </aside>
 
    )
}

export default SidebarComponent;

