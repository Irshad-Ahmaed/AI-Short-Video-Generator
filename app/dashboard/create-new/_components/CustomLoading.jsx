import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';


const CustomLoading = ({loading}) => {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <div className='flex flex-col items-center justify-center my-10 bg-white'>
                    <Image src={'/progress.gif'} width={100} height={100}/>
                    <h2 className='text-xl'>Generating your video...</h2>
                    <h2 className='text-xl text-yellow-700'>Don't refresh ⚠️</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default CustomLoading;