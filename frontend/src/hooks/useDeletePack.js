import axios from "axios";
import { toast } from "sonner";
import userStore from "../store/userStore/userStore";

export const handleDeletePack = async (id, status, setPacks) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (status === "APPROVED") {
    toast.error("Cannot delete that pack");
    return;
  }
  if (status === "DELIVERED") {
    toast.error("You have to give a rate before deleting it");
    return;
  }

  try {
    await axios.delete(`${apiUrl}/v1/api/client/pack/${id}`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    setPacks((prevPacks) => prevPacks.filter((pack) => pack.id !== id));

    toast.success("Package deleted successfully");
  } catch (error) {
    console.error("Error deleting package:", error);
    toast.error("Failed to delete package");
  }
};
