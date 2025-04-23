
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // TODO: Implement actual authentication
    if (email && password) {
      // For demo purposes, we'll just navigate to the dashboard
      navigate("/dashboard");
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white border border-gray-100 shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif text-rc-red flex justify-center">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-black"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-black"
            />
          </div>
          {error && <p className="text-sm text-rc-red">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-rc-red hover:bg-rc-red/90 text-white font-bold"
          >
            Sign In
          </Button>
          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 text-rc-red hover:text-rc-red/80"
              onClick={() => navigate("/register")}
            >
              Sign up
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
