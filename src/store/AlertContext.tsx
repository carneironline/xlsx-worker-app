'use client';

import { AlertProps } from '@/components/AlertComponent';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AlertContextProps {
    alertConfig: AlertProps;
    setAlertConfig: React.Dispatch<React.SetStateAction<AlertProps>>;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alertConfig, setAlertConfig] = useState<AlertProps>({
        title: 'Importação de planilha',
        description: '',
        type: 'info',
        show: false,
        totalDemands: 0,
        progress: undefined,
        errors: undefined,
        executionTime: undefined,
        hasErrors: false,
    });

    return <AlertContext.Provider value={{ alertConfig, setAlertConfig }}>{children}</AlertContext.Provider>;
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert deve ser usado dentro do AlertProvider');
    }
    return context;
};
