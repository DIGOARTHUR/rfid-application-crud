import { useState } from "react";
import logo from "../assets/logo.svg";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { MdPeopleOutline } from "react-icons/md";
export default function Sidebar() {




    return (
        <div className="bg-[#2C2E3E] text-white w-96 h-screen">

            <div className="h-[86px] font-TextLogo flex items-center justify-center gap-4">
                <img src={logo} alt="Your SVG" />
                <p className="text-4xl">PaperBox</p>
            </div>

            <div className="m-10">
                <ul>
                    <li>
                        <h3 className="text-[#8E94AC] font-semibold text-lg mb-5">PRODUÇÃO</h3>
                        <Link
                            to="/" className=" flex w-full text-start items-center gap-3 font-semibold text-xl"><IoDocumentTextOutline />REGISTRO</Link>


                    </li>
                    <li>
                        <h3 className="text-[#8E94AC] font-semibold text-lg mb-5 mt-10">RH</h3>
                        <Link
                            to="/employees" className=" flex w-full  text-start items-center gap-3 font-semibold text-xl"><MdPeopleOutline />COLABORADORES</Link>


                    </li>

                </ul>
            </div>

        </div>
    )
}