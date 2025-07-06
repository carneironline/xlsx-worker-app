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
    progress?: {
        current: number;
        total: number;
        percentage: number;
    };
    executionTime?: {
        milliseconds: number;
        seconds: number;
    };
}

export function AlertComponent({ className }: AlertProps) {
    const { alertConfig, setAlertConfig } = useAlert();
    const show = alertConfig.show;
    const type = alertConfig.type;
    const title = alertConfig.title;
    const description = alertConfig.description;
    const totalDemands = alertConfig.totalDemands || 0;
    const progress = alertConfig.progress;
    const executionTime = alertConfig.executionTime;

    function handleClose() {
        setAlertConfig((state) => ({
            ...state,
            show: false,
        }));
    }

    return (
        <Alert
            className={cn(
                'fixed left-1/2 md:left-[unset] transform md:transform-[unset] -translate-x-1/2 md:-translate-x-[unset] bottom-5 md:bottom-10 md:right-10 w-[360px]',
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

                {progress && (
                    <div className='mt-3'>
                        <div className='flex justify-between text-sm mb-1'>
                            <span>Progresso:</span>
                            <span>{progress.percentage}%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2'>
                            <div
                                className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                                style={{ width: `${progress.percentage}%` }}
                            ></div>
                        </div>
                        <p className='text-xs mt-1 text-gray-600'>
                            {progress.current} de {progress.total} demandas enviadas
                        </p>
                    </div>
                )}

                {totalDemands > 0 && !progress && (
                    <p className='mt-4 text-sm '>
                        <b>Total de demandas processadas:</b> {totalDemands}
                    </p>
                )}

                {executionTime && (
                    <p className='mt-2 text-xs text-gray-500'>
                        <b>Tempo de execução:</b> {executionTime.seconds.toFixed(2)}s
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
