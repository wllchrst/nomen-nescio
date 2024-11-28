import { AddGroupMemberData } from "./../interfaces/add-group-member.d";
import { ICreateGroup } from "../interfaces/create-group-interface";
import { Service } from "./service";
import { IRegister } from "../interfaces/register-interface";
import { IResponse } from "../interfaces/response-interface";
import { IGroupData } from "../interfaces/group-interface";

interface IGroup {
  id: number;
  name: string;
  description: string;
}

export class GroupService extends Service {
  constructor() {
    super();
  }

  async createGroup(data: ICreateGroup) {
    const result = await this.post<{
      success: boolean;
      data?: IGroup;
      message?: string;
    }>("/group", data);

    if (result?.success) {
      console.log(result?.data?.id);
      // console.log("berhasil create group dengan ID ", result.data.id);
    }
    return result;
  }

  async addGroupMember(data: AddGroupMemberData) {
    const result = await this.post<boolean>("/group-member", data);
    console.log("add Group Member", result);
    return result;
  }

  async getUserGroup(userId: string) {
    const result = await this.get<IResponse<IGroupData[]>>(
      `/user/group/${userId}`
    );
    return result;
  }

  async createGroupWithMembers(
    groupData: ICreateGroup,
    currentUser: { id: number },
    members: { id: number }[]
  ) {
    const groupResult = await this.createGroup(groupData);
    if (groupResult && groupResult.success) {
      const groupId = groupResult.data?.id;
      console.log("Group ID " + groupId);

      const ownerData: AddGroupMemberData = {
        group_id: groupId,
        members: [
          {
            user_id: currentUser.id,
            role: "Owner",
          },
        ],
      };
      await this.addGroupMember(ownerData);

      console.log(ownerData);
      console.log(members);
      for (const member of members) {
        const memberData: AddGroupMemberData = {
          group_id: groupId,
          members: [
            {
              user_id: member.id,
              role: "Members",
            },
          ],
        };
        await this.addGroupMember(memberData);
      }

      console.log("berhasil create group membersaaaaaaaaaaa", groupId);
      return groupResult.success;
    }
    console.log("ga bisa create group");
    return null;
  }
}
