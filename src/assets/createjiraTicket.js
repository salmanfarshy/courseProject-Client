import { createJiraTic } from "../apis/serverApis";

const createjiraTicket = async (e, setShowToast, setIsSpin, setIsJiraOpen) => {
  e.preventDefault();
  const link = window.location.href;
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  // console.log(data);
  const { name, email } = JSON.parse(localStorage.getItem("User"));
  setIsSpin(true);

  const res = await createJiraTic(
    email,
    name,
    link,
    data.priority,
    data.status,
    data.summary
  );
  setIsSpin(false);
  if (res.data === "success") setIsJiraOpen(false);
  console.log(res.data);
  setShowToast(res.data);
};

export default createjiraTicket;
