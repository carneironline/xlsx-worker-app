'use client';

import { AlertCircleIcon, CheckCircle2Icon, Info, XCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useAlert } from '@/store/AlertContext';

type AlertType = 'success' | 'error' | 'info';

export interface AlertProps {
    className?: string;
    title?: string;
    description?: string;
    type?: AlertType;
    show?: boolean;
    totalDemands?: number;
}

export function AlertComponent({ className }: AlertProps) {
    const { alertConfig, setAlertConfig } = useAlert();
    const show = alertConfig.show;
    const type = alertConfig.type;
    const title = alertConfig.title;
    const description = alertConfig.description;
    const totalDemands = alertConfig.totalDemands || 0;

    function handleClose() {
        setAlertConfig((state) => ({
            ...state,
            show: false,
        }));
    }

    return (
        <Alert
            className={cn(
                'fixed left-1/2 md:left-[unset] transform md:transform-[unset] -translate-x-1/2 md:-translate-x-[unset] bottom-5 md:bottom-10 md:right-10 w-fit w-full w-[360px] ',
                className,
                show ? 'animate-slide-in' : 'hidden'
            )}
        >
            {type === 'success' && <CheckCircle2Icon />}
            {type === 'error' && <AlertCircleIcon />}
            {type === 'info' && <Info />}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}

                {totalDemands > 0 && (
                    <p className='mt-4 text-sm '>
                        <b>Tota de demandas processadas:</b> {totalDemands}
                    </p>
                )}
            </AlertDescription>

            <XCircle
                className='!size-5 absolute top-[-11px] right-[-8px] bg-white cursor-pointer'
                onClick={handleClose}
            />
        </Alert>
    );
}
