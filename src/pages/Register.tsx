
import { RegisterForm } from "@/components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-2">
          {/* <img
            src="/images/Louis-Vuitton-logo.png"
            alt="Louis Vuitton Logo"
            width={150}
            height={75}
          /> */}
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
