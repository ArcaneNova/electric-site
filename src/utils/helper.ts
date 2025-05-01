import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export function isAuthorized(user: any, allowedRoles: string[]) {
  return user && allowedRoles.includes(user.role)
}

export async function protectRoute(allowedRoles: string[]) {
  const user = await getCurrentUser()
  if (!user || !isAuthorized(user, allowedRoles)) {
    redirect("/auth/login")
  }
  return user
}