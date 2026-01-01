import { Clapperboard, ImageOff } from "lucide-react"
import React from "react"
import { Github } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"

const Navbar = () => {
    const navigateTo = useNavigate()
    return (
        <motion.nav initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.5 ,duration:0.5}} className="
      w-full
      h-16
      bg-[#1b1b1b]
      border-b
      border-gray-700
      flex
      items-center
      justify-between
      px-8
    ">

            <div className="cursor-pointer flex items-center gap-2 select-none" onClick={() => navigateTo('/')}>
                <Clapperboard size={22} className="text-[#F5C518]" />
                <span className="text-[#F5C518] text-xl font-extrabold tracking-wide">
                    Watch
                    <span className="text-gray-300">Wise</span>
                </span>
            </div>



            <a
                href="https://github.com/SnehPatel03/WatchWise"
                target="_blank"
                rel="noopener noreferrer"
                className="
          text-gray-300
          hover:text-[#F5C518]
          transition-colors duration-400
          hover:bg-gray-50/10 p-2 rounded-full
        "
            >
                <Github size={22} />
            </a>
        </motion.nav>
    )
}

export default Navbar
