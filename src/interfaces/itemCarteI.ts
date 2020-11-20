import { CategorieI } from './categorieI';
import {AllergeneI} from './allergeneI'
import { ImageI } from './imageI';
import { TvaI } from './TvaI';
import { OptionsItemI } from './OptionsItem';
import { PromotionI } from './promotionI';

export interface ItemCarteI {
    // Elément de la carte
    id: String;
    // Nom
    name: String; 
    // Description
    description: String;
    // Prix
    price: Number;
    // Ordre d'affichage
    order: Number;
    // Image
    sourceImage: ImageI;
    // Entrée? plat ? dessert? 
    categorie: CategorieI;
    // Liste d'allergènes
    allergenes: AllergeneI[];
    // Taux TVA
    tva:TvaI;
    // Options associées 
    options:OptionsItemI[];
    // Visible ?
    visible:boolean;
    // Liste de promotions
    promotions:PromotionI[];
    // Quantitée disponible
//  stock:number;
 }