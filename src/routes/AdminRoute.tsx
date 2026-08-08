import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
