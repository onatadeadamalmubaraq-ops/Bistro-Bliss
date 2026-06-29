import { useEffect } from "react";
import { socket } from "../services/socket";
import toast from "react-hot-toast";

export default function useNotifications() {
  useEffect(() => {
    socket.on("newNotification", (data) => {
      toast.success(data.message);
    });
  }, []);
}