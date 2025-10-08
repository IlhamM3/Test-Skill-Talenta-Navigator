import api from "./Axios";
export async function GetAllDatalist() {
  try {
    const res = await api.get("4e602db4-efab-438f-a664-bec50fc16f7e");
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return null;
  }
}