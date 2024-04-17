import { Skeleton } from '@material-ui/lab'
import React from 'react'

export default function ListingSkeleton() {
    return (
        <div className='listing_skeleton'>
            <div className='row align-items-start'>
                <div className='col-4'>
                    <Skeleton className='img_skl' animation="wave" width="100%" />
                </div>
                <div className='col-8'>
                    <div className='d-flex w-50 mb-4'>
                        <Skeleton animation="wave" height={15} width="30%" className='mr-3' />
                        <Skeleton animation="wave" height={15} width="30%" />
                    </div>
                    <Skeleton animation="wave" width="80%" className='mb-3' />
                    <Skeleton animation="wave" width="40%" className='mb-4' />
                    <Skeleton animation="wave" height={15} className='mb-3 mr-3' />
                    <Skeleton animation="wave" height={15} className='mb-4' width="80%" />
                    <div className='d-flex mb-5'>
                        <Skeleton animation="wave" width="15%" height={20} className='mr-3' />
                        <Skeleton animation="wave" width="15%" height={20} className='mr-3' />
                        <Skeleton animation="wave" width="15%" height={20} className='mr-3' />
                        <Skeleton animation="wave" width="15%" height={20} className='mr-3' />
                        <Skeleton animation="wave" width="15%" height={20} />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <Skeleton animation="wave" width="20%" />
                        <Skeleton animation="wave" width="20%" className='mr-3' />
                    </div>
                </div>
            </div>
        </div>
    )
}
