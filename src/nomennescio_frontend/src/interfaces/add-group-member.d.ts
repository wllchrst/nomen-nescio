export interface AddGroupMemberData {
  group_id: number;
  members: MemberData[];
}

export interface MemberData {
  user_id: number;
  role: string;
}