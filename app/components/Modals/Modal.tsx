"use client"
import React, { ReactElement, useCallback, useEffect, useState } from "react";

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
    secondaryLabel?: string;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryLabel }) => {
    const [showModel, setShowModel] = useState(isOpen)

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
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    <div className={`translate duration-300 ${showModel ? 'translate-y-0' : 'translate-y-full'} ${showModel ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start p-6 rounded-t justify-center relative border-b-[1px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal