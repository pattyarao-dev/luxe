import LoginComp from "@/components/pages/login/loginComponent"
import Image from "next/image"

export default function Home() {
    return (
        <main className="w-screen min-h-screen flex items-center justify-center flex-col primary-background">
            <LoginComp />
        </main>
    )
}
