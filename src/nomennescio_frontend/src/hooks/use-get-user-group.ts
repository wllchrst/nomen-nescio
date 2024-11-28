import { useEffect, useState } from "react";
import { GroupService } from "../service/group-service";
import { IGroupData } from "../interfaces/group-interface";

const groupService = new GroupService();

export default function useGetUserGroup(userId: string) {
  const [groups, setGroups] = useState<IGroupData[]>([]);

  async function fetchGroup() {
    const result = await groupService.getUserGroup(userId);
    if (result == null) return;
    else if (result.success == false) return;
    console.log(result.data);

    setGroups(result.data);
  }

  useEffect(() => {
    fetchGroup();
  }, []);

  return { groups };
}
