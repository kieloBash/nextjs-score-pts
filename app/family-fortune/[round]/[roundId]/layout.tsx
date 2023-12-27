import FortuneProvider from "@/components/fortune/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FortuneProvider>{children}</FortuneProvider>
    </>
  );
}
