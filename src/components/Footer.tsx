import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-card border-t">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Buraimi Store. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
