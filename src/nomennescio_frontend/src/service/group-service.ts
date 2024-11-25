import { AddGroupMemberData } from "./../interfaces/add-group-member.d";
import { ICreateGroup } from "../interfaces/create-group-interface";
import { Service } from "./service";

export class GroupService extends Service {
  constructor() {
    super();
  }

  async createGroup(data: ICreateGroup) {
    const result = await this.post<boolean>("/group", data);
    return result;
  }

  async addGroupMember(data: AddGroupMemberData) {
    const result = await this.post<boolean>("/group-member", data);
    return result;
  }
}
