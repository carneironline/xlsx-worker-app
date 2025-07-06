'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <Card className='h-auto'>
            <h2 className='text-2xl text-center font-bold'>Counter</h2>
            <p className='text-lg text-center'>{count}</p>
            <Button onClick={() => setCount(count + 1)}>Incrementar</Button>
        </Card>
    );
}
