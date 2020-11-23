import { BetweenTimeI } from './BetweenTimeI';

export interface DisponibilityI {
    disponible: BetweenTimeI[];
    dateDebut: string;
    dateFin: string;
    jourValide: boolean[];
    ferie: boolean;
}
