import dynamic from "next/dynamic";
import Admin from "admin/layout/AdminBase";

const AdminPage = dynamic(() => import("admin/layout/AdminBase"), {
  ssr: false,
});

export default AdminPage;
