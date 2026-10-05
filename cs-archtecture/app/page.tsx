import ArchitectureCanvas from "@/components/architecture/ArchitectureCanvas";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            CS ARCHITECTURE
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Explore how computers
            <br />
            actually work.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            An interactive architecture of Computer Science — from physical
            hardware and digital logic to software, algorithms, and intelligent
            systems.
          </p>
        </div>

        <ArchitectureCanvas />
      </section>
    </main>
  );
}