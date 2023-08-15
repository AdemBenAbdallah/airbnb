"use client"

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModel from '@/app/hooks/useRegisterModel'
import useLoginModel from '@/app/hooks/useLoginModel'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModal from '@/app/hooks/useRentModal'


interface NavbarProps {
    currentUser?: User | null
}

const UserMenu: React.FC<NavbarProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const registerModel = useRegisterModel()
    const loginModel = useLoginModel()
    const renModal = useRentModal()

    const toggleOpen = useCallback(() => {
        setIsOpen((value: boolean) => !value)
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            loginModel.onOpen()
        }else renModal.onOpen()
    }, [currentUser, loginModel, renModal])
    return (
        <div className="relative">
            <div className="
                flex
                flex-row
                items-center
                gap-3
            ">
                <div
                    onClick={onRent}
                    className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                ">
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className='
                        g-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    '
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block" >
                        <Avatar />
                    </div>
                </div>
            </div>

            {
                isOpen && (
                    <div
                        className='
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                      '
                    >
                        <div className='flex flex-col cursor-pointer'>
                            {
                                currentUser ? (
                                    <>
                                        <MenuItem
                                            onClick={() => { }}
                                            label="My trips"
                                        />
                                        <MenuItem
                                            onClick={() => { }}
                                            label="My favorites"
                                        />
                                        <MenuItem
                                            onClick={() => { }}
                                            label="My reservations"
                                        />
                                        <MenuItem
                                            onClick={() => { }}
                                            label="My properties"
                                        />
                                        <MenuItem
                                            onClick={renModal.onOpen}
                                            label="Airbnb my home"
                                        />
                                        <MenuItem
                                            onClick={() => signOut()}
                                            label="Logout"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <MenuItem
                                            onClick={loginModel.onOpen}
                                            label="login"
                                        />
                                        <MenuItem
                                            onClick={registerModel.onOpen}
                                            label="Sign up"
                                        />
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default UserMenu