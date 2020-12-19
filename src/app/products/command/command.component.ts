import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { ClientI } from 'src/interfaces/Client';
import { BasketResume } from 'src/interfaces/commande/basketResume';
import { CommandeResume } from 'src/interfaces/commande/commandeResume';
import { CommandeI } from 'src/interfaces/CommandeI';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  client: ClientI = JSON.parse(JSON.stringify(this.data.client));
  isCommandeGenerate: boolean = false;
  coordinate: FormGroup;
  deleveryMode: FormGroup;
  validate: FormGroup;
  timeToTake: FormGroup;
  commande: CommandeI;
  basketResume: BasketResume = new BasketResume();
  commandeResume: CommandeResume = new CommandeResume();
  displayedColumns: string[] = ['qty', 'productName', 'priceTTC', 'priceFN'];

  constructor(private _formBuilder: FormBuilder, private clientService: ClientService, @Inject(MAT_DIALOG_DATA)
  public data: { client }) { }

  selectionChange(event: StepperSelectionEvent) {
    if (event.selectedIndex == 1) {
      this.client.name = this.coordinate.get("name").value;
      this.client.lastName = this.coordinate.get("lastName").value;
      this.client.city = this.coordinate.get("city").value;
      this.client.zip = this.coordinate.get("zip").value;
      this.client.adresseL1 = this.coordinate.get("adresseL1").value;
      this.client.adresseL2 = this.coordinate.get("adresseL2").value;
      this.clientService.updateClient(this.client).pipe(first()).subscribe();
    }
    if (event.selectedIndex == 2) {
      if (!this.isCommandeGenerate) {
        this.clientService.generateCommande(this.deleveryMode.get("mode").value).pipe(first()).subscribe(client => {
          this.commande = client.commande;
          this.commandeResume = this.clientService.generateCommandeResume(client.commande.items);
          this.basketResume = this.clientService.generateBasketResume(client.currentPanier);
        })
      }
    }
  }

  ngOnInit(): void {
    this.coordinate = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      adresseL1: [''],
      adresseL2: [''],
      zip: [''],
      city: ['']
    });
    this.deleveryMode = this._formBuilder.group({
      mode: ['', Validators.required]
    })
    this.validate = this._formBuilder.group({
      validate: ['', Validators.required]
    })
    this.coordinate.patchValue({
      name: this.client.name,
      lastName: this.client.lastName,
      adresseL1: this.client.adresseL1,
      adresseL2: this.client.adresseL2,
      zip: this.client.zip,
      city: this.client.city
    });
  }

}
