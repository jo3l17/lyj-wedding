import { Component, OnInit } from "@angular/core";
import { UserWithGifts } from "../user-with-gifts.model";
import { UserService } from "../user.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  users: UserWithGifts[] = [];

  constructor(private readonly userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }
}