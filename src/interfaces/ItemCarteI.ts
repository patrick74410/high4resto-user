import { AllergeneI } from './AllergeneI';
import { ImageI } from './ImageI';
import { ItemCategorieI } from './ItemCategorieI';
import { OptionsItemI } from './OptionsItem';
import { PromotionI } from './PromotionI';
import { TvaI } from './TvaI';

export interface ItemCarteI {
    // Elément de la carte
    id: string;
    // Nom
    name: string;
    // Description
    description: string;
    // Prix
    price: number;              //prix de base TTC sans promotion sans options
    priceHT?:number;            //prix hors taxe avec promotion et options
    priceFN?:number;            //prix TTX avec promotion et optionsItem
    promotionM?:number;         //prix des promotions seules
    tvaPrice?:number;           //prix
    longName: string;           //Nom long
    // Ordre d'affichage
    order: number;
    // Image
    sourceImage: ImageI;
    // Entrée? plat ? dessert?
    categorie: ItemCategorieI;
    // Liste d'allergènes
    allergenes: AllergeneI[];
    // Taux TVA
    tva: TvaI;
    // Options associées
    options: OptionsItemI[];
    // Visible ?
    visible: boolean;
    // Liste de promotions
    promotions: PromotionI[];
    // Quantitée disponible
    stock: number;
    remarque: string;

}
