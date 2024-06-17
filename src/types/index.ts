export type LayoutProps = {
  links: { name: string; url: string; image: any; alternativeImage: any }[];
  children: React.ReactNode;
};

export interface IMember {
  firstName: string;
  lastName: string;
  username: string;
  type: "trainer" | "trainee";
}
export interface StatsCardProps {
  title: string;
  value: string;
  color: string;
  link?: {
    href: string;
    label: string;
  };
}

export interface Fields {
  name: string;
  placeholder: string;
  onchange: (e: any) => any;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  data: any;
}

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  ADMIN = "ADMIN",
}

export interface Address {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}

export interface Profile {
  profilePicture?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  createdAt: string;
  address: Address;
}
