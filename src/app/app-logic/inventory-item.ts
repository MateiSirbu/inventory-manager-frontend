export class InventoryItem {
    id: string;
    name: string;
    user: string;
    description: string;
    location: string;
    inventoryNumber: number;
    createdAt: Date;
    addedAt: Date;
    addedBy: string;
    modifiedAt: Date;
    modifiedBy: string;
    active: boolean;

    public constructor(init?: Partial<InventoryItem>) {
        Object.assign(this, init)
    }
}
