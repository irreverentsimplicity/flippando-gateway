'use client'
import { Link } from '@chakra-ui/next-js'
import Achievements from './Achievements';
import { background } from '@chakra-ui/react';

export default function Footer() {

    return (
        <div className="flex-1 pt-20 pb-5 mx-auto justify-items-center content-center text-center">
            <div className="text-[2vw] font-semibold leading-none text-center text-shadow-lg mb-10">
                Journey milestones
            </div>
            <Achievements />

            <p className="pt-8 text-xs">
                made with &#x2764;&#xFE0F; by <Link href="https://github.com/irreverentsimplicity">@irreverentsimplicity</Link>
            </p>
        </div>
    );
}