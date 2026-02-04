import { API_URL } from "@/src/shared/contants/env.constants";

export const getInitialUsers = async () => {
    const res = await fetch(`${API_URL}/user?page=1&limit=10`, {
        cache: "no-store",
    });
    return res.json();
};
