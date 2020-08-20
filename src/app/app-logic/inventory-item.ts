import { OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY } from '@angular/cdk/overlay/dispatchers/overlay-keyboard-dispatcher';

export class InventoryItem {
    id: number;
    name: string;
    user: string;
    description: string;
    location: string;
    inventoryNumber: number;
    createdAt: Date;
    modifiedAt: Date;
    deleted: boolean;

    public constructor(init?: Partial<InventoryItem>)
    {
        Object.assign(this, init)
    }

}
