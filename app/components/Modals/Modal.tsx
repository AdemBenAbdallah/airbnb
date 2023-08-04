"use client"
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io';
import Button from "../Button";
import useRegisterModel from "@/app/hooks/useRegisterModel";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: ReactElement;
    footer?: ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryActionLabel }) => {
    const [showModel, setShowModel] = useState(isOpen)
    const registerModel = useRegisterModel()

    useEffect(() => {
        setShowModel(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) return
        setShowModel(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [disabled, onClose])

    const handleSumbit = useCallback(() => {
        if (disabled) return
        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return
        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) return null;
    return (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto ">
                    <div className={`translate duration-300 ${showModel ? 'translate-y-0' : 'translate-y-full'} ${showModel ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                    <IoMdClose size={10} onClick={registerModel.onClose}/>
                                </button>
                                <div className="text-lg font-semibold">{title}</div>
                            </div>
                            <div className="relative p-6 flex-auto">{body}</div>
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {
                                        secondaryAction && secondaryActionLabel && (
                                            <Button label={secondaryActionLabel} onClick={handleSumbit} disabled outline />
                                        )
                                    }
                                    <Button disabled label={actionLabel} onClick={handleSumbit} />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal