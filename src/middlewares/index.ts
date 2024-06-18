export const isUserAllowed = (allowedRoles: string[]) :boolean => {
  const rolesString = localStorage.getItem("userRoles");
  let  roles = rolesString?.split(', ');
  console.log(roles)
  const rolesSet = new Set(roles);
  let isAllowed = false;
  for(let allowedRole in allowedRoles){
    if(rolesSet.has(allowedRoles[allowedRole])){
      isAllowed = true;
    }
  }
 return isAllowed;
}