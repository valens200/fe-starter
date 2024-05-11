import { IMember } from "@/types";
import { atom, selector } from "recoil";

export const showAddOrEditMemberState = atom<{
  show: boolean;
  type: "trainer" | "trainee";
  action: "add" | "edit";
  member?: IMember;
} | null>({
  key: "showAddMemberState",
  default: null,
});

export const showRequestApparatusState = atom({
  key: "showRequestApparatusState",
  default: false,
});

export const showCreateExperimentState = atom({
  key: "showCreateExperimentState",
  default: false,
});

export const selectedSubjectState = atom<
  "chemistry" | "biology" | "physics" | "other" | null
>({
  key: "SelectedSubject",
  default: null,
});

export const showSelectSubjectState = selector({
  key: "ShowSelectSubject",
  get: ({ get }) => {
    return get(selectedSubjectState) === null;
  },
});

export const showContactSupportState = atom({
  key: "ShowContactSupport",
  default: false,
});

export const showAddCommentState = atom({
  key: "showAddComment",
  default: false,
});
export const showUpdateEmployee = atom({
  key: "showUpdateEmployee",
  default: false,
});
export const showUpdateLaptop = atom({
  key: "showupdateLaptop",
  default: false,
});

export const showCreateLaptop = atom({
  key: "showCreateLaptop",
  default: false,
});
