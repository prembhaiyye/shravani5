export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-center text-black/70 dark:text-white/70">
        © {new Date().getFullYear()} Shreeram Electronics. All rights reserved.
      </div>
    </footer>
  );
}