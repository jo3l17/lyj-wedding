import { Component, Input, OnInit } from "@angular/core";
import { faTrashAlt, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { DialogService } from "src/app/dialog/dialog.service";
import { UserService } from "src/app/users/user.service";
import { Gift } from "../gift.model";
import { GiftsService } from "../gift.service";

@Component({
  selector: "gift-item",
  templateUrl: "./gift-item.component.html",
  styleUrls: ["./gift-item.component.scss"],
})
export class GiftItemComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrashAlt = faTrashAlt;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  @Input() disableButtons: boolean = false;
  @Input() gift!: Gift;
  @Input() isMyGifts: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly giftsService: GiftsService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin();
  }

  deleteGift() {
    if (!this.disableButtons) {
      if (this.isAdmin) {
        this.dialogService
          .openConfirmDialog(
            `Estas seguro que quieres eliminar <strong>${this.gift.name}</strong>?`
          )
          .subscribe(async (result: boolean) => {
            if (result) {
              await this.giftsService.deleteGift(this.gift.uuid ?? "");
            }
          });
      }
    }
  }

  addToMyGifts() {
    if (!this.disableButtons) {
      if (this.isLoggedIn) {
        this.dialogService
          .openConfirmDialog(
            `Estas seguro que quieres agregar <strong>${this.gift.name}</strong> a tus regalos?`
          )
          .subscribe(async (result: boolean) => {
            if (result) {
              await this.giftsService.addGiftToUser(this.gift.uuid ?? "");
            } else {
              console.log("cancelled");
            }
          });
      }
    }
  }
}
