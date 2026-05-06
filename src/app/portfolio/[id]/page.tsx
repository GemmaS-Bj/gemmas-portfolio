export default function PortfolioItemPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Projet {params.id}</h1>
      <p className="mt-4 text-xl">Page en cours de construction.</p>
    </main>
  );
}
