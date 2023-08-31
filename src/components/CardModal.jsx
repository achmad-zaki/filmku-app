import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"
import { Fragment } from "react"
import Link from "next/link"
import { RiH3 } from "react-icons/ri"

const CardModal = (props) => {
    const {
        onClose,
        show,
        src,
        title,
        overview,
        route,
        alt
    } = props

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-dark p-5 text-left align-middle shadow-xl transition-all border border-white/25">
                                <div className="bg-white mb-3 rounded-md">
                                    <Image
                                        className="w-full rounded-md object-cover object-center h-[200px]"
                                        src={src}
                                        width={500}
                                        height={500}
                                        alt={alt}
                                    />
                                </div>
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-bold leading-6"
                                >
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm font-normal mt-2 max-h-36 overflow-y-auto">
                                        {overview}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href={route}
                                        className="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
                                    >
                                        Detail
                                    </Link>
                                    <button
                                        type="button"
                                        className="ml-2 inline-flex justify-center rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CardModal