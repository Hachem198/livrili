import axios from "axios";
import { toast } from "sonner";
import userStore from "../store/userStore/userStore";

export const handleDeletePack = async (id, status) => {
  status = "DELIVERED";
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log({ id });
  if (status == "APPROVED") {
    toast.error("Cannot delete that pack");
    return;
  }
  if (status == "DELIVERED") {
    toast.error("You have to give a rate before deleting it");
    return;
  }
  try {
    axios.delete(`${apiUrl}/v1/api/client/pack/${id}`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
  } catch (error) {
    console.log(error);
  }
};
