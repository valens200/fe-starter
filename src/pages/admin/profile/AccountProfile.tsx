import { Profile } from "@/types";
import { TextInput } from "@mantine/core";
const AccountProfile = () => {
  const profile: Profile = {
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    nationalId: "123456789",
    createdAt: "2020-01-01",
    address: {
      province: "California",
      district: "Los Angeles",
      sector: "Downtown",
      cell: "Central",
      village: "Village Name",
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("rcaappuser");
    localStorage.removeItem("token");
    // navigate.push("/");
  };
  return (
    <div className="w-full h-full overflow-x-hidden p-2 text-sm">
      <header className="text-[#000000B2] font-semibold mx-1 my-2">
        Account Profile
      </header>

      <div className="w-full flex flex-col justify-between mt-2">
        <img
          src={(profile?.profilePicture as string) ?? "/logo.png"}
          width={100}
          height={100}
          alt={`${profile?.firstName}'s Image`}
          className="w-[10rem] h-[10rem] rounded-[100%] self-center border border-[rgba(67,67,67,0.09)] bg-[rgba(67,67,67,0.03)]  rounded-lg my-2"
        />
        <div className="w-full flex flex-col md:flex-row justify-center gap-3">
          <div className="w-full md:w-[38%]">
            <p className="text-[rgba(67,67,67,0.43)] mt-[-1rem] pt-3">
              Personal Info
            </p>
            <div className=" w-full flex flex-col my-2 px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>First Name: </p>
              <p>{profile?.firstName || "Not set"}</p>
            </div>
            <div className=" w-full flex flex-col my-2 px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Last Name: </p>
              <TextInput defaultValue={profile?.lastName || "Not set"} />
            </div>
            <div className=" w-full flex flex-col my-2 px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Email: </p>
              <TextInput defaultValue={profile?.email || "Not set"} />
            </div>

            <div className=" w-full flex flex-col my-2 px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Phone Number: </p>
              <p>{profile?.phoneNumber || "Not set"}</p>
            </div>
            <div className=" w-full flex flex-col my-2 px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>National ID: </p>
              <p>{profile?.nationalId || "Not set"}</p>
            </div>
            <div className=" w-full flex flex-col my-2 px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Member Since: </p>
              <p>{profile?.createdAt || "Not set"}</p>
            </div>
          </div>

          <div className="w-full md:w-[38%] flex flex-col">
            <p className="text-[rgba(67,67,67,0.43)] mt-[-1rem] pt-4">
              Residencial info
            </p>
            <div className=" w-full flex flex-col my-[0.3rem] px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Province: </p>
              <p>{profile?.address.province || "Not set"}</p>
            </div>
            <div className=" w-full flex flex-col my-[0.3rem] px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>District: </p>
              <p>{profile?.address.district || "Not set"}</p>
            </div>
            <div className=" w-full flex flex-col my-[0.3rem] px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Sector: </p>
              <p>{profile?.address.sector || "Not set"}</p>
            </div>
            <div className=" w-full flex flex-col my-[0.3rem] px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Cell: </p>
              <p>{profile?.address.cell || "Not set"}</p>
            </div>
            <div className=" w-full flex flex-col my-[0.3rem] px-3 py-3 text-black  bg-[rgba(67,67,67,0.03)]  rounded-md border-[1px] border-[rgba(67,67,67,0.09)]">
              <p style={{ fontSize: "70%" }}>Cell: </p>
              <p>{profile?.address.village || "Not set"}</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-[#3e7874] self-end justify-self-end mt-5 md:mt-22 mb-12 text-white rounded-md  border-[2px] border-[rgba(67,67,67,0.09)] px-7 py-3"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
