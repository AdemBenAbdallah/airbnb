'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';

import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';

import ListingHead from '@/app/components/listings/ListingHead';
import { categories } from '@/app/components/navbar/Categories';
import ListingInfo from '@/app/components/listings/ListingInfo';

import useLoginModel from '@/app/hooks/useLoginModel';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';


const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}
interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({ reservations = [], listing, currentUser }) => {
    const loginModel = useLoginModel()
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.starDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })

        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen()
        }

        setIsLoading(true)

        axios.post('/api/reservation', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success('Listing reserved!')
                setDateRange(initialDateRange)
                router.refresh()
            })
            .catch(() => {
                toast.error('Somethin went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModel])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            )

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }

    }, [dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) =>
            item.label === listing.category
        )
    }, [listing.category])

    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.localionValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.desciption}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.localionValue}
                    />
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingClient