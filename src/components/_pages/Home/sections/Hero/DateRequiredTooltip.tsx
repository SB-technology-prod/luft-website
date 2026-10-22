import { ReactElement } from 'react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export function DateRequiredTooltip({
    children,
    enabled,
    message,
}: {
    children: ReactElement;
    enabled: boolean;
    message: string;
}) {
    if (!enabled) return children;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>{message}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}