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
    errors?: {
        count: number;
        success: number;
    };
    executionTime?: {
        milliseconds: number;
        seconds: number;
    };
    hasErrors?: boolean;
}

export function AlertComponent({ className }: AlertProps) {
    const { alertConfig, setAlertConfig } = useAlert();
    const show = alertConfig.show;
    const type = alertConfig.type;
    const title = alertConfig.title;
    const description = alertConfig.description;
    const totalDemands = alertConfig.totalDemands || 0;
    const progress = alertConfig.progress;
    const errors = alertConfig.errors;
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
                'fixed left-1/2 md:left-[unset] transform md:transform-[unset] -translate-x-1/2 md:-translate-x-[unset] bottom-5 md:bottom-10 md:right-10 w-[380px]',
                className,
                show ? 'animate-slide-in' : 'hidden'
            )}
        >
            {type === 'success' && <CheckCircle2Icon />}
            {type === 'error' && <AlertCircleIcon />}
            {type === 'info' && <Info />}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                <div className='whitespace-pre-line'>{description}</div>

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
                            {progress.current} de {progress.total} demandas processadas
                        </p>

                        {errors && (errors.success > 0 || errors.count > 0) && (
                            <div className='flex justify-between text-xs mt-2 pt-2 border-t border-gray-200'>
                                <span className='text-green-600 flex items-center'>
                                    <span className='w-2 h-2 bg-green-500 rounded-full mr-1'></span>
                                    Sucesso: {errors.success}
                                </span>
                                {errors.count > 0 && (
                                    <span className='text-red-600 flex items-center'>
                                        <span className='w-2 h-2 bg-red-500 rounded-full mr-1'></span>
                                        Erros: {errors.count}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {totalDemands > 0 && !progress && (
                    <div className='mt-4'>
                        <p className='text-sm'>
                            <b>Total de demandas processadas:</b> {totalDemands}
                        </p>
                        {errors && (errors.success > 0 || errors.count > 0) && (
                            <div className='flex justify-between text-sm mt-2 pt-2 border-t border-gray-200'>
                                <span className='text-green-600'>✅ Sucesso: {errors.success}</span>
                                {errors.count > 0 && (
                                    <span className='text-red-600'>❌ Erros: {errors.count}</span>
                                )}
                            </div>
                        )}
                    </div>
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
