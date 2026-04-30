import { redirect } from "next/navigation";

export default function CustomSignDefaultLocaleRequestComplete() {
  redirect("/en/custom-sign/request-complete");
}
