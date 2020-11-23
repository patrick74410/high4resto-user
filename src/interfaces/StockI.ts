import { DisponibilityI } from './Disponibility';
import { ItemCarteI } from './ItemCarteI';

export interface StockI {
    id?: string;
    item: ItemCarteI;
    // Quand le produit est-il diponible?
    disponibility: DisponibilityI;
    // Quand a-t-il été ajouté
    inside: string;
}
