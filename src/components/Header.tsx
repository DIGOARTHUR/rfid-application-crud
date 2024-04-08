
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineNotifications } from "react-icons/md";
export default function Header() {
    return (
        <div className="flex justify-between items-center px-5 bg-[#F4F4FC] h-[86px] drop-shadow-[0px_40px__40px_rgba(0,0,0,0.25)]">
            <div >
                <GiHamburgerMenu size={35} />
            </div>
            <div className="flex justify-center items-center gap-5">
                <MdOutlineNotifications size={35} />
                <div className=" flex justify-center items-center  rounded-full h-9 w-9 bg-[#A8A8A8] text-white ">
                    <span className="text-xs">
                        ADM
                    </span>

                </div>
            </div>
        </div>
    )
}