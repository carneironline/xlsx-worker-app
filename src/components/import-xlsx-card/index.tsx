'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { useAlert } from '@/store/AlertContext';
import { WorkerXlsxResponse } from '@/types/workers';

export function ImportXlsxCard() {
    const { setAlertConfig } = useAlert();
    const workerRef = useRef<Worker | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [, setFileSelected] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file: File | null = event.target.files ? event.target.files[0] : null;

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {
            const arrayBuffer = event.target && event.target.result;

            if (workerRef.current) {
                workerRef.current.postMessage(arrayBuffer);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    function clearFile() {
        setFileSelected(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    useEffect(() => {
        workerRef.current = new Worker('/workers/xlsxWorker.js');

        workerRef.current.onmessage = (event) => {
            const data: WorkerXlsxResponse = event.data;

            if (data.alert) {
                setAlertConfig((state) => ({
                    ...state,
                    description: data.message,
                    show: true,
                    totalDemands: data.totalDemands,
                }));
            }

            if (data.totalDemands) {
                console.log('worker data:', data);
            }

            clearFile();

            // setAlertConfig((state) => ({
            //         ...state,
            //         title: 'Processando arquivo',
            //         description: `O arquivo ${file.name} está sendo processado.`,
            //         show: true,
            //     }));
        };

        // return () => {
        //     workerRef.current?.terminate();
        // };
    }, [setAlertConfig]);

    return (
        <Card className='h-auto'>
            <h2 className='text-2xl font-bold flex-1'>Importe sua planilha</h2>
            <Input type='file' ref={inputRef} className='cursor-pointer' onChange={handleChange} />
        </Card>
    );
}
