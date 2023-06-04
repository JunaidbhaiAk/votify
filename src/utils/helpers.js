export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}


export const convertDate = (date) => {
  let dob;
  if(date) dob = new Date(date.toNumber() * 1000) 
  else dob = new Date();
  var dobArr = dob.toDateString().split(" ");
  var dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];
  return dobFormat;
};
