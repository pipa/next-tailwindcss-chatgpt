import { redirect } from "next/navigation";
import { Router } from "next/router";
import { ReactNode } from "react";

export default function Page(): ReactNode | Promise<ReactNode> {
  return redirect('/chat');
}