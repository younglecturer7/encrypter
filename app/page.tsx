import { ThemeToggle } from "@/components/custom-ui/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col w-full gap-4 md:gap-6">
      <header className="flex max-h-screen bg-background sticky top-0 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 py-2 lg:gap-2 lg:px-6">
          {/* <SidebarTrigger className="-ml-1" /> */}

          <h3 className="text-base font-medium max-sm:text-sm md:text-lg lg:text-xl">
            Mr. Obono Encrypt - Decrypt Project App
          </h3>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {/* sign and sign-out */}
            <div className="justify-end items-center hidden md:block p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton>
                  <Button className="bg-transparent hover:bg-primary border-2 mr-3 border-primary border-ceramic-white text-ceramic-white rounded-full font-medium  text-sm h-5 sm:h-8 px-4 sm:px-4 sm:text-base cursor-pointer">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-primary hover:bg-transparent hover:border-2 hover:border-primary text-ceramic-white rounded-full font-medium text-sm sm:text-base h-5 sm:h-8 px-4 sm:px-4 cursor-pointer">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>
      <main className="flex w-full h-screen items-center justify-center flex-col md:px-6">
        {/* design a card with tailwind css */}
        <Card className="flex md:min-w-2xl mx-5 max-w-2xl flex-col gap-4 rounded-lg border bg-card p-4 shadow-md md:gap-6 md:p-6">
          <CardHeader className="flex justify-center font-bold text-2xl">
            Project Abstract
          </CardHeader>
          <CardContent>
            <p className="text-sm md:text-base leading-6 text-justify">
              In today&apos;s digital age, data security is a pressing concern.
              This thesis presents the design, development, and implementation
              of a secure data encryption and decryption system, utilizing
              advanced cryptographic techniques to protect sensitive information
              from unauthorized access. The proposed system employs a hybrid
              approach, combining symmetric and asymmetric encryption algorithms
              to ensure confidentiality, integrity, and authenticity of data.
              The system is evaluated through rigorous testing and analysis,
              demonstrating its efficacy in safeguarding data against various
              types of attacks. This research contributes to the development of
              robust data protection mechanisms, essential for secure
              communication in modern computing environments.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <CardAction className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <div className="flex flex-col justify-items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <SignInButton>
                      <Button className="bg-transparent hover:bg-primary border-2 border-primary border-ceramic-white text-ceramic-white rounded-full font-medium  text-sm h-5 sm:h-8 px-4 sm:px-4 py-3 sm:py-3 sm:text-base cursor-pointer">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button className="bg-primary hover:bg-transparent hover:border-2 hover:border-primary text-ceramic-white rounded-full font-medium text-sm sm:text-base h-5 sm:h-8 px-4 sm:px-4 py-3 sm:py-3 cursor-pointer">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                  <CardDescription className="text-xs mt-1 italic text-destructive">
                    Please Sign-Up if you are using this application for the
                    first time or Sign-In if you have already registered.
                  </CardDescription>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-between items-center gap-4">
                  <UserButton />
                  <Button className="bg-primary mr-auto hover:bg-transparent hover:border-2 hover:border-primary text-ceramic-white rounded-full font-medium text-sm sm:text-base h-5 sm:h-8 px-4 sm:px-4 py-3 sm:py-3 cursor-pointer">
                    <Link href={"/dashboard"}>Go Home</Link>
                  </Button>
                </div>
              </SignedIn>
            </CardAction>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

// for footer section
export function Footer() {
  return (
    <footer className="flex flex-col py-3 w-full bg-background sticky bottom-0 h-16 shrink-0 items-center justify-center border-t">
      <p className="text-sm text-pretty flex px-10 text-muted-foreground">
        &copy; 2025 Encrypt App; All rights reserved.
      </p>
      <p className="text-sm text-pretty flex px-10 text-muted-foreground">
        Powered By{" "}
        <Link href={"#YoungMindTech"} className="text-pretty px-1">
          <strong>Young Mind Tech (YMT)</strong>
        </Link>
      </p>
    </footer>
  );
}
